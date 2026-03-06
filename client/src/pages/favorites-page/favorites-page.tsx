import { FavoritesCardList } from "../../components/favorites-card-list/favorites-card-list";
import { Logo } from "../../components/logo/logo";
import { Offer } from "../../types/offer";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../store/api-actions";
import { AppRoute } from "../../const";
import { JSX } from "react";

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const offersList = useAppSelector((state) => state.offers);
  const user = useAppSelector((state) => state.user);
  
  const favoriteOffers = offersList.filter(offer => offer.isFavorite);
  const favoriteCount = favoriteOffers.length;
  
  const favoritesByCity = favoriteOffers.reduce<Record<string, Offer[]>>((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {});

  const handleLogout = async () => {
    await dispatch(logoutAction());
    navigate(AppRoute.Main);
  };

  const getFullImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `http://localhost:5000${path}`;
  };

  const userInitial = user?.email ? user.email[0].toUpperCase() : 'U';

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
                {/* Only the user profile link - NO separate Favorites button */}
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
                      {user?.email || 'email@example.com'}
                    </span>
                    <span className="header__favorite-count">{favoriteCount}</span>
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
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            {Object.keys(favoritesByCity).length === 0 ? (
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            ) : (
              <ul className="favorites__list">
                {Object.entries(favoritesByCity).map(([cityName, cityOffers]) => (
                  <li key={cityName} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to={`/?city=${cityName}`}>
                          <span>{cityName}</span>
                        </Link>
                      </div>
                    </div>
                    <FavoritesCardList offersList={cityOffers} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="img/logo.svg" alt="Rent service logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export { FavoritesPage };