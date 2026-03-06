import { JSX } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../../components/logo/logo";
import { AppRoute } from "../../const";

function NotFoundPage(): JSX.Element {
  return (
    <div className="page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link to={AppRoute.Main}>
                <Logo />
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <main style={{ 
        flexGrow: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{ marginTop: '-60px' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#4481c3' }}>404</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Page not found</p>
          <Link 
            to={AppRoute.Main} 
            className="button" 
            style={{ 
              padding: '12px 24px', 
              backgroundColor: '#4481c3', 
              color: 'white', 
              textDecoration: 'none', 
              borderRadius: '4px',
              display: 'inline-block'
            }}
          >
            Go to main page
          </Link>
        </div>
      </main>
    </div>
  );
}

export { NotFoundPage };