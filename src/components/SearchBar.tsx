import React from 'react';
import { SearchBarProps } from '../types';

const SearchBar: React.FC<SearchBarProps> = React.memo(({ searchTerm, onSearchChange, totalResults, totalLoaded }) => {
  return (
    <div className="mb-4 bg-white p-4 rounded-lg shadow-lg border-2 border-blue-400">
      <div className="flex items-center gap-3">
        <svg 
          className="w-6 h-6 text-blue-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
        <input
          type="text"
          className="flex-1 px-4 py-3 text-lg border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 focus:border-blue-500 bg-blue-50 transition-all duration-200 placeholder:text-gray-400"
          placeholder="Search by title, body, or user ID..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <small className="block mt-3 text-sm font-medium text-gray-600">
        Showing <span className="font-bold text-blue-600">{totalResults}</span> result{totalResults !== 1 ? 's' : ''}
        {searchTerm && <span className="text-gray-500"> (filtered from {totalLoaded} loaded)</span>}
      </small>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;
