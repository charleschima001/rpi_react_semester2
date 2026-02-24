import { OffersList } from '../../types/offer';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type NearPlacesCardProps = {
  offer: OffersList;
  onCardMouseEnter?: (id: string) => void;
  onCardMouseLeave?: () => void;
};

function NearPlacesCard({ offer, onCardMouseEnter, onCardMouseLeave }: NearPlacesCardProps) {
  const ratingPercent = Math.round(offer.rating * 20);

  const handleMouseEnter = () => {
    if (onCardMouseEnter) {
      onCardMouseEnter(offer.id);
    }
  };

  const handleMouseLeave = () => {
    if (onCardMouseLeave) {
      onCardMouseLeave();
    }
  };

  return (
    <article 
      className="near-places__card place-card" 
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={`${AppRoute.Offer}/${offer.id}`}>
          <img 
            className="place-card__image" 
            src={offer.previewImage}
            width="260" 
            height="200" 
            alt="Place image" 
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export { NearPlacesCard };