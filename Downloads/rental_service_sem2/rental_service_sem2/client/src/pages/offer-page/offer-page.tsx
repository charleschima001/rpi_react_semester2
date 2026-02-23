import { Logo } from "../../components/logo/logo";
import { FullOffer, OffersList } from "../../types/offer";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { useParams } from "react-router-dom";
import { ReviewsForm } from "../../components/reviews-form/reviews-form";
import { ReviewsList } from "../../components/reviews-list/reviews-list";
import { Map } from "../../components/map/map";
import { MapPoint } from "../../types/map";
import { reviews } from "../../mocks/reviews"; 
import { amsterdamCity } from "../../mocks/city";
import { NearPlacesList } from "../../components/near-places-list/near-places-list";
import { useState } from 'react';
import { Review, User } from "../../types/review";
import { useAppSelector } from "../../hooks";

type OfferPageProps = {
  offers: FullOffer[];
  offersList: OffersList[];
}

function OfferPage({ offers, offersList }: OfferPageProps){
  const params = useParams();
  const offer = offers.find((item) => item.id === params.id);
  
  const storeOffersList = useAppSelector((state) => state.offers);
  
  const favoriteCount = storeOffersList.filter(item => item.isFavorite).length;
  
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | undefined>(undefined);
  const [currentReviews, setCurrentReviews] = useState(reviews); 
  
  if (!offer){
    return <NotFoundPage/>;
  }

  const handleAddReview = (newReviewData: Omit<Review, 'id' | 'date'>) => {
    const newReview: Review = {
      ...newReviewData,
      id: crypto.randomUUID(), 
      date: new Date().toISOString(), 
    };
    
    setCurrentReviews(prevReviews => [newReview, ...prevReviews]);
  };

  const nearbyOffers = offersList
    .filter(item => item.id !== offer.id)
    .slice(0, 3);

  const mapPoints: MapPoint[] = [
    {
      id: offer.id,
      title: offer.title,
      lat: offer.location.latitude,
      lng: offer.location.longitude
    },
    ...nearbyOffers.map(offer => ({
      id: offer.id,
      title: offer.title,
      lat: offer.location.latitude,
      lng: offer.location.longitude
    }))
  ];

  const handleCardMouseEnter = (id: string) => {
    const point = mapPoints.find((point) => point.id === id);
    setSelectedPoint(point);
  };

  const handleCardMouseLeave = () => {
    setSelectedPoint(undefined);
  };

  const galleryImages = offer.images.slice(0, 6);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                    </div>
                    <span className="header__user-name user__name">Myemail@gmail.com</span>
                    <span className="header__favorite-count">{favoriteCount}</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {galleryImages.map((image) => (
                <div key={image} className="offer__image-wrapper">
                  <img 
                    className="offer__image" 
                    src={`/${image}`} 
                    alt="Photo studio" 
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              
              <div className="offer__name-wrapper">
                <h1 className="offer__name">
                  {offer.title}
                </h1>
                <button className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use href="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(offer.rating / 5) * 100}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.bedrooms} Bedroom{offer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.maxAdults} adult{offer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>
              
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {offer.goods.map((good) => (
                    <li key={good} className="offer__inside-item">
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${offer.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                    <img 
                      className="offer__avatar user__avatar" 
                      src={`/${offer.host.avatarUrl}`} 
                      width="74" 
                      height="74" 
                      alt="Host avatar" 
                    />
                  </div>
                  <span className="offer__user-name">
                    {offer.host.name}
                  </span>
                  {offer.host.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {offer.description}
                  </p>
                </div>
              </div>
              
              <ReviewsList reviews={currentReviews} /> 
              <ReviewsForm onAddReview={handleAddReview} />
            </div>
          </div>
          <section className="offer__map map">
            <Map 
              city={amsterdamCity}
              points={mapPoints}
              selectedPoint={selectedPoint || {
                id: offer.id,
                title: offer.title,
                lat: offer.location.latitude,
                lng: offer.location.longitude
              }}
              className="offer__map"
            />
          </section>
        </section>
        <div className="container">
          <NearPlacesList 
            offers={nearbyOffers}
            onCardMouseEnter={handleCardMouseEnter}
            onCardMouseLeave={handleCardMouseLeave}
          />
        </div>
      </main>
    </div>
  );
}

export { OfferPage };