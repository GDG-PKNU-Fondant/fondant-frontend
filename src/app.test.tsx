import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('User Component with MSW', () => {
  it('renders mocked user data', async () => {
    render(<App />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    const user = await screen.findByText('Welcome, Fondant!');
    expect(user).toBeInTheDocument();
  });
});
