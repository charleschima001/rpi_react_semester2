import { JSX } from 'react';
import './loading-page.css';

function LoadingPage(): JSX.Element {
  return (
    <div className="loading-page">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}

export { LoadingPage };