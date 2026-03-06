import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { 
  fetchOfferAction,
  fetchReviewsAction, 
  postReviewAction, 
  logoutAction,
  toggleFavoriteAction 
} from "../../store/api-actions";
import { Logo } from "../../components/logo/logo";
import { ReviewsList } from "../../components/reviews-list/reviews-list";
import { ReviewsForm } from "../../components/reviews-form/reviews-form";
import { Map } from "../../components/map/map";
import { NearPlacesList } from "../../components/near-places-list/near-places-list";
import { CITIES_LOCATION, AppRoute } from "../../const";
import { LoadingPage } from "../../components/loading-page/loading-page";

const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/static')) return `http://localhost:5000${path}`;
  return path;
};

function OfferPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const currentOffer = useAppSelector((state) => state.currentOffer);
  const offerLoadingStatus = useAppSelector((state) => state.offerLoadingStatus);
  const reviewsByOfferId = useAppSelector((state) => state.reviews || {});
  const user = useAppSelector((state) => state.user);
  const offers = useAppSelector((state) => state.offers);
  
  const [selectedPoint, setSelectedPoint] = useState<any>();
  
  const currentReviews = params.id ? reviewsByOfferId[params.id] || [] : [];
  const favoriteCount = offers.filter(o => o.isFavorite).length;

  const handleLogout = async () => {
    await dispatch(logoutAction());
    navigate(AppRoute.Main);
  };

  const handleFavoriteClick = () => {
    if (currentOffer) {
      const newStatus = currentOffer.isFavorite ? 0 : 1;
      dispatch(toggleFavoriteAction({ offerId: currentOffer.id, status: newStatus }));
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOfferAction(params.id));
      dispatch(fetchReviewsAction(params.id));
    }
    window.scrollTo(0, 0);
  }, [params.id, dispatch]);

  if (offerLoadingStatus === 'loading') {
    return <LoadingPage />;
  }

  if (offerLoadingStatus === 'failed' || !currentOffer) {
    navigate('/404');
    return null;
  }

  const offer = currentOffer; 

  const nearbyOffers = offers
    .filter(item => item.id !== offer.id)
    .slice(0, 3);
  
  const cityData = CITIES_LOCATION.find(city => city.name === offer.city.name);

  const mapPoints = [
    {
      id: offer.id,
      title: offer.title,
      latitude: offer.location.latitude,
      longitude: offer.location.longitude
    },
    ...nearbyOffers.map(offer => ({
      id: offer.id,
      title: offer.title,
      latitude: offer.location.latitude,
      longitude: offer.location.longitude
    }))
  ];

  const handleAddReview = (reviewData: { comment: string; rating: number }) => {
    if (params.id) {
      dispatch(postReviewAction({
        offerId: params.id,
        comment: reviewData.comment,
        rating: reviewData.rating
      }));
    }
  };

  const galleryImages = [
    offer.previewImage,
    ...(offer.photos || [])
  ].filter(Boolean);

  const getFullImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://localhost:5000${path}`;
  };

  const userInitial = user?.email ? user.email[0].toUpperCase() : 'U';

  const rooms = offer.rooms || offer.bedrooms || 1;
  const guests = offer.guests || offer.maxAdults || 2;
  const features = offer.features || offer.goods || [];

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main}>
                <Logo />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {user ? (
                  <>
                    <li className="header__nav-item">
                      <Link className="header__nav-link" to="/profile">
                        <span>Profile</span>
                      </Link>
                    </li>

                    <li className="header__nav-item user">
                      <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          {user?.avatar ? (
                            <img 
                              src={getFullImageUrl(user.avatar)}
                              alt="User avatar"
                              style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  const initial = document.createElement('span');
                                  initial.style.display = 'inline-block';
                                  initial.style.width = '20px';
                                  initial.style.height = '20px';
                                  initial.style.backgroundColor = '#4481c3';
                                  initial.style.color = 'white';
                                  initial.style.borderRadius = '50%';
                                  initial.style.textAlign = 'center';
                                  initial.style.lineHeight = '20px';
                                  initial.style.fontSize = '12px';
                                  initial.style.fontWeight = 'bold';
                                  initial.textContent = user.email?.[0].toUpperCase() || 'U';
                                  parent.appendChild(initial);
                                }
                              }}
                            />
                          ) : (
                            <span style={{
                              display: 'inline-block',
                              width: '20px',
                              height: '20px',
                              backgroundColor: '#4481c3',
                              color: 'white',
                              borderRadius: '50%',
                              textAlign: 'center',
                              lineHeight: '20px',
                              fontSize: '12px',
                              fontWeight: 'bold'
                            }}>
                              {userInitial}
                            </span>
                          )}
                        </div>
                        <span className="header__user-name user__name">
                          {user?.email}
                        </span>
                        <span className="header__favorite-count" style={{ marginLeft: '5px' }}>
                          {favoriteCount}
                        </span>
                      </Link>
                    </li>

                    <li className="header__nav-item">
                      <Link 
                        to="#" 
                        className="header__nav-link"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                      >
                        <span className="header__signout">Sign out</span>
                      </Link>
                    </li>
                  </>
                ) : (

                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Login}>
                      <span className="header__signout">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery" style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
              gap: '15px',
              width: '100%'
            }}>
              {galleryImages.map((image, index) => (
                <div key={index} className="offer__image-wrapper" style={{ 
                  width: '100%',
                  height: '150px',
                  overflow: 'hidden',
                  borderRadius: '8px'
                }}>
                  <img 
                    className="offer__image" 
                    src={getImageUrl(image)} 
                    alt={`${offer.title} - ${index + 1}`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/200x150?text=No+Image';
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ height: '20px', clear: 'both' }}></div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}
              
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button 
                  className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`} 
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use href="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">
                    {offer.isFavorite ? 'In bookmarks' : 'To bookmarks'}
                  </span>
                </button>
              </div>
              
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${(offer.rating / 5) * 100}%`}}></span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>
              
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {rooms} Bedroom{rooms > 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {guests} adult{guests > 1 ? 's' : ''}
                </li>
              </ul>
              
              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              
              {features.length > 0 && (
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {features.map((good: string) => (
                      <li key={good} className="offer__inside-item">{good}</li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div 
                    className={`offer__avatar-wrapper ${offer.author?.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}
                    style={{
                      width: '74px',
                      height: '74px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      backgroundColor: '#e6e6e6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {offer.author?.avatarUrl ? (
                      <img
                        className="offer__avatar user__avatar"
                        src={offer.author.avatarUrl}
                        width="74"
                        height="74"
                        alt="Host avatar"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center'
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const initials = document.createElement('div');
                            initials.style.width = '100%';
                            initials.style.height = '100%';
                            initials.style.display = 'flex';
                            initials.style.alignItems = 'center';
                            initials.style.justifyContent = 'center';
                            initials.style.fontSize = '32px';
                            initials.style.fontWeight = 'bold';
                            initials.style.color = '#9b9b9b';
                            initials.style.textTransform = 'uppercase';
                            initials.textContent = offer.author?.name?.[0] || 'H';
                            parent.appendChild(initials);
                          }
                        }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: '#9b9b9b',
                        textTransform: 'uppercase',
                        backgroundColor: '#e6e6e6'
                      }}>
                        {offer.author?.name?.[0] || 'H'}
                      </div>
                    )}
                  </div>
                  <span className="offer__user-name">
                    {offer.author?.name || 'Host'}
                  </span>
                  {offer.author?.isPro && (
                    <span className="offer__user-status">Pro</span>
                  )}
                </div>
                <div className="offer__description">
                  <p className="offer__text">{offer.description}</p>
                </div>
              </div>

              <ReviewsList reviews={currentReviews} />
              {user && <ReviewsForm onAddReview={handleAddReview} />}
            </div>
          </div>

          <section className="offer__map map">
            <Map 
              city={cityData || {
                name: offer.city.name,
                location: offer.location
              }}
              points={mapPoints}
              selectedPoint={selectedPoint}
            />
          </section>
        </section>

        <div className="container">
          <NearPlacesList 
            offers={nearbyOffers}
            onCardMouseEnter={(id) => {
              const point = mapPoints.find(p => p.id === id);
              setSelectedPoint(point);
            }}
            onCardMouseLeave={() => setSelectedPoint(undefined)}
          />
        </div>
      </main>
    </div>
  );
}

export { OfferPage };