import React from 'react';

const SearchBar = React.memo(({ searchTerm, onSearchChange, totalResults, totalLoaded }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search by title, body, or user ID..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <small className="form-text text-muted">
        Showing {totalResults} result{totalResults !== 1 ? 's' : ''}
        {searchTerm && ` (filtered from ${totalLoaded} loaded)`}
      </small>
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;

