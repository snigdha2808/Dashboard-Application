import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home', () => {
  it('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome to Dashboard')).toBeInTheDocument();
  });

  it('renders dashboard overview', () => {
    render(<Home />);
    expect(screen.getByText('Dashboard Overview')).toBeInTheDocument();
  });

  it('renders features list', () => {
    render(<Home />);
    expect(screen.getByText('Features:')).toBeInTheDocument();
    expect(screen.getByText(/Responsive layout with sidebar navigation/i)).toBeInTheDocument();
    expect(screen.getByText(/API integration for data fetching/i)).toBeInTheDocument();
  });
});

