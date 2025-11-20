import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import SearchBar from './SearchBar';
import PostsTable from './PostsTable';
import LoadingIndicator from './LoadingIndicator';
import ErrorDisplay from './ErrorDisplay';
import InfiniteScrollTrigger from './InfiniteScrollTrigger';

const Data = () => {
  const [allData, setAllData] = useState([]); // Store all data for search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const itemsPerPage = 10;
  const searchTimeoutRef = useRef(null);

  // Fetch data from JSONPlaceholder API with pagination
  const fetchData = useCallback(async (page = 1, append = false) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }
      setError(null);
      
      // JSONPlaceholder uses _page and _limit for pagination
      const url = `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${itemsPerPage}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      // Check if we got less items than requested (means we're at the end)
      if (result.length < itemsPerPage) {
        setHasMoreData(false);
      }
      
      if (append) {
        setAllData((prevData) => [...prevData, ...result]);
      } else {
        setAllData(result);
      }
    } catch (err) {
      const errorMessage = err.message || 'Failed to fetch data. Please try again later.';
      setError(errorMessage);
      console.error('Error fetching data:', err);
      setHasMoreData(false);
      
      // Clear data on error if it's the first load
      if (page === 1) {
        setAllData([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [itemsPerPage]);

  // Debounce search term
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms debounce

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm]);

  // Memoize filtered data - only recalculates when allData or debouncedSearchTerm changes
  const filteredData = useMemo(() => {
    if (debouncedSearchTerm.trim() === '') {
      return allData;
    }
    return allData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
    );
  }, [allData, debouncedSearchTerm]);

  // Initial data fetch
  useEffect(() => {
    setCurrentPage(1);
    setHasMoreData(true);
    fetchData(1, false);
  }, [fetchData]);

  // Load more data from API when scrolling to bottom
  const loadMoreData = useCallback(() => {
    if (loadingMore || !hasMoreData) {
      return;
    }
    
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    fetchData(nextPage, true);
  }, [loadingMore, hasMoreData, currentPage, fetchData]);

  if (loading) {
    return <LoadingIndicator message="Loading data..." />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4">Posts</h1>
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        totalResults={filteredData.length}
        totalLoaded={allData.length}
      />

      <PostsTable data={filteredData} searchTerm={debouncedSearchTerm} />

      <InfiniteScrollTrigger
        onLoadMore={loadMoreData}
        hasMoreData={hasMoreData}
        loadingMore={loadingMore}
        loading={loading}
      />

      {/* End of data indicator */}
      {!hasMoreData && filteredData.length > 0 && (
        <div className="text-center py-3">
          <small className="text-muted">
            All data loaded. Showing {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}
          </small>
        </div>
      )}
    </div>
  );
};

export default Data;

