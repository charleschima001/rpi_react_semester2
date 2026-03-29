import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { AppRoute } from '../const';

describe('NotFoundPage', () => {
  const renderPage = () => render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>
  );

  it('displays 404 heading', () => {
    renderPage();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('displays "Page not found" message', () => {
    renderPage();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it('has a link to the main page', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /go to main page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });
});