import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CitiesCard } from '../components/cities-card/cities-card';
import { makeFakeOffer } from './mocks';

describe('CitiesCard', () => {
  const mockOffer = makeFakeOffer();
  const mockOnMouseEnter = vi.fn();
  const mockOnMouseLeave = vi.fn();

  const renderCard = (props = {}) => render(
    <MemoryRouter>
      <CitiesCard
        id={mockOffer.id}
        title={mockOffer.title}
        type={mockOffer.type}
        price={mockOffer.price}
        previewImage={mockOffer.previewImage}
        isPremium={mockOffer.isPremium}
        rating={mockOffer.rating}
        onCardMouseEnter={mockOnMouseEnter}
        onCardMouseLeave={mockOnMouseLeave}
        {...props}
      />
    </MemoryRouter>
  );

  it('displays offer title', () => {
    renderCard();
    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });

  it('displays offer price', () => {
    renderCard();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
  });

  it('displays Premium badge when isPremium is true', () => {
    renderCard({ isPremium: true });
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('does not display Premium badge when isPremium is false', () => {
    renderCard({ isPremium: false });
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('link to offer page contains correct id', () => {
    renderCard();
    const link = screen.getByRole('link', { name: mockOffer.title });
    expect(link).toHaveAttribute('href', `/offer/${mockOffer.id}`);
  });
});