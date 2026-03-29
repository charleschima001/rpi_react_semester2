import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { MainPage } from '../pages/main-page/main-page';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus } from '../const';

const fakeUserInfo = {
  id: 'user-1',
  email: 'test@example.com',
  username: 'Test User',
  avatar: null,
  isPro: false,
  token: 'fake-token',
};
const mockOffer = {
  id: '1',
  title: 'Test Offer',
  type: 'apartment',
  price: 100,
  city: {
    name: 'Paris',
    location: {
      latitude: 48.8566,
      longitude: 2.3522,
      zoom: 13
    }
  },
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
  },
  isFavorite: true,
  isPremium: false,
  rating: 4.5,
  previewImage: 'test.jpg',
};

describe('MainPage Header for unauthorized user', () => {
  it('displays Sign in link', () => {
    renderWithProviders(<MainPage />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('does not display user email', () => {
    renderWithProviders(<MainPage />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    
    expect(screen.queryByText(/test@example.com/)).not.toBeInTheDocument();
  });

  it('does not display Sign out button', () => {
    renderWithProviders(<MainPage />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        user: null,
      },
    });
    
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });
});

describe('MainPage Header for authorized user', () => {
  it('displays user email', () => {
    renderWithProviders(<MainPage />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: [mockOffer],
      },
    });
    
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  it('displays Sign out button', () => {
    renderWithProviders(<MainPage />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: [mockOffer],
      },
    });
    
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('displays Profile link', () => {
    renderWithProviders(<MainPage />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: [mockOffer],
      },
    });
    
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });

  it('displays favorite count', () => {
    const favoriteOffers = [
      { ...mockOffer, id: '1', isFavorite: true },
      { ...mockOffer, id: '2', isFavorite: true },
      { ...mockOffer, id: '3', isFavorite: false },
    ];

    renderWithProviders(<MainPage />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: favoriteOffers,
      },
    });

    const favoriteCountElement = screen.getByText('2');
    expect(favoriteCountElement).toBeInTheDocument();
  });
});