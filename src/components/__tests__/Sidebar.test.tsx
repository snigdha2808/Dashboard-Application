import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Sidebar', () => {
  it('renders dashboard title', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithRouter(<Sidebar />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Data')).toBeInTheDocument();
  });

  it('highlights active route', () => {
    window.history.pushState({}, 'Test page', '/');
    renderWithRouter(<Sidebar />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('bg-blue-600');
  });
});

