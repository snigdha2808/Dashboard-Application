import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Data from '../Data';

// Mock the API
global.fetch = jest.fn();

describe('Data Component', () => {
  const mockPosts = [
    { id: 1, userId: 1, title: 'Test Post 1', body: 'Body 1' },
    { id: 2, userId: 2, title: 'Test Post 2', body: 'Body 2' },
  ];

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('renders loading indicator initially', () => {
    (fetch as jest.Mock).mockImplementation(() =>
      new Promise(() => {}) // Never resolves to keep loading
    );

    render(<Data />);
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('renders posts after successful API call', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<Data />);

    await waitFor(() => {
      expect(screen.getByText('Posts')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    });
  });

  it('renders error message on API failure', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<Data />);

    await waitFor(() => {
      expect(screen.getByText('Error!')).toBeInTheDocument();
    });
  });

  it('filters posts when searching', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockPosts,
    });

    render(<Data />);

    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText(/search by title/i);
    fireEvent.change(searchInput, { target: { value: 'Post 1' } });

    // Wait for debounce (500ms) + render
    await waitFor(() => {
      expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    }, { timeout: 2000 });
    
    expect(screen.queryByText('Test Post 2')).not.toBeInTheDocument();
  });

  it('calls API with correct pagination parameters', async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockPosts,
    });

    render(<Data />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('_page=1&_limit=10')
      );
    });
  });
});

