import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingPage } from '../components/loading-page/loading-page';

describe('LoadingPage', () => {
  it('renders without errors', () => {
    render(<LoadingPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('displays spinner element', () => {
    render(<LoadingPage />);
    const spinner = document.querySelector('.spinner');
    expect(spinner).toBeInTheDocument();
  });
});