import React from 'react';
import { SearchBarProps } from '../types';

const SearchBar: React.FC<SearchBarProps> = React.memo(({ searchTerm, onSearchChange, totalResults, totalLoaded }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Search by title, body, or user ID..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <small className="block mt-2 text-sm text-gray-500">
        Showing {totalResults} result{totalResults !== 1 ? 's' : ''}
        {searchTerm && ` (filtered from ${totalLoaded} loaded)`}
      </small>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
