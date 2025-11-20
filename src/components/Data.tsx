import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import SearchBar from './SearchBar';
import PostsTable from './PostsTable';
import LoadingIndicator from './LoadingIndicator';
import ErrorDisplay from './ErrorDisplay';
import InfiniteScrollTrigger from './InfiniteScrollTrigger';
import { Post } from '../types';

const Data: React.FC = () => {
  const [allData, setAllData] = useState<Post[]>([]); // Store all data for search
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);
  const itemsPerPage: number = 10;
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch data from JSONPlaceholder API with pagination
  const fetchData = useCallback(async (page: number = 1, append: boolean = false): Promise<void> => {
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
      
      const result: Post[] = await response.json();
      
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data. Please try again later.';
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
  const filteredData = useMemo<Post[]>(() => {
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
  const loadMoreData = useCallback((): void => {
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
    <div className="w-full p-6 flex flex-col h-full">
      <h1 className="mb-4 text-3xl font-bold text-gray-800 flex-shrink-0">Posts</h1>
      
      <div className="sticky top-0 z-20 bg-white pb-4 flex-shrink-0 -mx-6 px-6">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalResults={filteredData.length}
          totalLoaded={allData.length}
        />
      </div>

      <div className="flex-1 overflow-hidden min-h-0">
        <PostsTable 
          data={filteredData} 
          searchTerm={debouncedSearchTerm}
          onLoadMore={loadMoreData}
          hasMoreData={hasMoreData}
          loadingMore={loadingMore}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Data;
