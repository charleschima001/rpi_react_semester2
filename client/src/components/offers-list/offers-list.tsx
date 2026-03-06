import { JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { Offer } from '../../types/offer';
import { toggleFavoriteAction } from '../../store/api-actions';

type OffersListProps = {
  offers: Offer[];
};

function OffersList({ offers }: OffersListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  if (!offers || offers.length === 0) {
    return <div className="cities__places-list places__list tabs__content">No offers available</div>;
  }

  const handleImageLoad = (offerId: string) => {
    setLoadedImages(prev => new Set(prev).add(offerId));
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, offerId: string) => {
    console.log(`Image failed for offer ${offerId}:`, e.currentTarget.src);
    const img = e.currentTarget;
    const originalSrc = img.src;
    
    if (originalSrc.includes('localhost:5000')) {
      img.src = originalSrc.replace('http://localhost:5000', '');
    } else if (!originalSrc.startsWith('http')) {
      img.src = `http://localhost:5000${originalSrc}`;
    } else {
      img.src = 'https://via.placeholder.com/260x200?text=No+Image';
    }
  };
  const handleFavoriteClick = (e: React.MouseEvent, offerId: string, currentStatus: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = currentStatus ? 0 : 1;
    dispatch(toggleFavoriteAction({ offerId, status: newStatus }));
  };

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <article key={offer.id} className="cities__card place-card">
          {offer.isPremium && (
            <div className="place-card__mark">
              <span>Premium</span>
            </div>
          )}
          <div className="cities__image-wrapper place-card__image-wrapper">
            <Link to={`/offer/${offer.id}`}>
              <img 
                className="place-card__image" 
                src={offer.previewImage} 
                width="260" 
                height="200" 
                alt={offer.title}
                onLoad={() => handleImageLoad(offer.id)}
                onError={(e) => handleImageError(e, offer.id)}
                style={{ 
                  backgroundColor: '#f0f0f0',
                  display: 'block',
                  opacity: loadedImages.has(offer.id) ? 1 : 0.5
                }}
              />
            </Link>
          </div>
          <div className="place-card__info">
            <div className="place-card__price-wrapper">
              <div className="place-card__price">
                <b className="place-card__price-value">&euro;{offer.price}</b>
                <span className="place-card__price-text">&#47;&nbsp;night</span>
              </div>
              <button 
                className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`} 
                type="button"
                onClick={(e) => handleFavoriteClick(e, offer.id, offer.isFavorite)}
              >
                <svg className="place-card__bookmark-icon" width="18" height="19">
                  <use href="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">
                  {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                </span>
              </button>
            </div>
            <div className="place-card__rating rating">
              <div className="place-card__stars rating__stars">
                <span style={{ width: `${Math.round(offer.rating) * 20}%` }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <h2 className="place-card__name">
              <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
            </h2>
            <p className="place-card__type">{offer.type}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export { OffersList };