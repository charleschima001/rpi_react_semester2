import { JSX, useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOffersAction, logoutAction } from '../../store/api-actions';
import { CitiesList } from '../../components/cities-list/cities-list';
import { OffersList } from '../../components/offers-list/offers-list';
import { Map } from '../../components/map/map';
import { Sorting } from '../../components/sorting/sorting';
import { LoadingPage } from '../../components/loading-page/loading-page';
import { AppRoute, SortOffersType } from '../../const';

type SortType = typeof SortOffersType[keyof typeof SortOffersType];

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);
  const user = useAppSelector((state) => state.user);

  // Sorting state
  const [activeSort, setActiveSort] = useState<SortType>(SortOffersType.Popular);

  useEffect(() => {
    console.log('MainPage mounted, dispatching fetchOffersAction');
    dispatch(fetchOffersAction());
  }, [dispatch]);

  // Handle logout
  const handleLogout = async () => {
    await dispatch(logoutAction());
    navigate(AppRoute.Main);
  };

  // Filter offers by current city
  const filteredOffers = offers.filter((offer) => offer.city.name === currentCity);
  
  // Sort offers based on active sort type
  const currentOffers = useMemo(() => {
    switch (activeSort) {
      case SortOffersType.PriceToHigh:
        return [...filteredOffers].sort((a, b) => a.price - b.price);
      
      case SortOffersType.PriceToLow:
        return [...filteredOffers].sort((a, b) => b.price - a.price);
      
      case SortOffersType.TopRated:
        return [...filteredOffers].sort((a, b) => b.rating - a.rating);
      
      case SortOffersType.Popular:
      default:
        return filteredOffers;
    }
  }, [filteredOffers, activeSort]);

  const favoriteCount = offers.filter(o => o.isFavorite).length;

  console.log('Current offers:', currentOffers.length);

  const cityInfo = currentOffers.length > 0 
    ? currentOffers[0].city 
    : {
        name: currentCity,
        location: {
          latitude: 48.8566,
          longitude: 2.3522,
          zoom: 13
        }
      };

  if (isOffersDataLoading && offers.length === 0) {
    return <LoadingPage />;
  }

  // Helper function to get full image URL
  const getFullImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://localhost:5000${path}`;
  };

  const userInitial = user?.email ? user.email[0].toUpperCase() : 'U';

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main} className="header__logo-link">
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </Link>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {user ? (
                  // Authenticated user view
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
                  // Guest view
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
      
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        
        <CitiesList selectedCity={currentCity} />
        
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              
              <b className="places__found">
                {currentOffers.length} places to stay in {currentCity}
              </b>
              
              {/* Pass sort props to Sorting component */}
              <Sorting activeSort={activeSort} onSortChange={setActiveSort} />
              
              <OffersList offers={currentOffers} />
            </section>
            
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map 
                  city={cityInfo}
                  points={currentOffers.map((offer) => ({
                    id: offer.id,
                    latitude: offer.location.latitude,
                    longitude: offer.location.longitude,
                    title: offer.title,
                  }))}
                  selectedPoint={undefined}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { MainPage };