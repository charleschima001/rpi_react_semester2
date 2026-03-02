import { JSX } from "react";
import { Logo } from "../../components/logo/logo";

function NotFoundPage(): JSX.Element {
  return (
    <div className="page" style={{ textAlign: 'center', padding: '50px' }}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
            <div className="header__left">
              <Logo />
            </div>
            </div>
          </div>
        </div>
      </header>
      
      <main style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ marginTop: '-60px' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: '#4481c3' }}>404</h1>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Страница не найдена</p>
          <a href="/" className="button" style={{ 
            padding: '12px 24px', 
            backgroundColor: '#6f98c4ff', 
            color: 'white', 
            textDecoration: 'none', 
            borderRadius: '4px' 
          }}>
            На главную
          </a>
        </div>
      </main>
    </div>
  );
}

export { NotFoundPage };