import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/private-route/private-route';
import { AuthorizationStatus, AppRoute } from '../const';

type AuthStatus = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

function renderPrivateRoute(status: AuthStatus) {
  return render(
    <MemoryRouter initialEntries={[AppRoute.Favorites]}>
      <Routes>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={status}>
              <div data-testid="protected-content">Protected Content</div>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<div data-testid="login-page">Login Page</div>}
        />
      </Routes>
    </MemoryRouter>
  );
}

describe('PrivateRoute', () => {
  it('shows protected content for authorized user', () => {
    renderPrivateRoute(AuthorizationStatus.Auth);
    
    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });

  it('redirects to login for unauthorized user', () => {
    renderPrivateRoute(AuthorizationStatus.NoAuth);
    
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('redirects to login for unknown status', () => {
    renderPrivateRoute(AuthorizationStatus.Unknown);
    
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});