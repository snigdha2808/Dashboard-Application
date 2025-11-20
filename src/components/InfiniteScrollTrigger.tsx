import React, { useEffect, useRef } from 'react';
import { InfiniteScrollTriggerProps } from '../types';

const InfiniteScrollTrigger: React.FC<InfiniteScrollTriggerProps> = React.memo(({ onLoadMore, hasMoreData, loadingMore, loading }) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMoreData && !loadingMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMoreData, loadingMore, loading, onLoadMore]);

  if (!hasMoreData) {
    return null;
  }

  return (
    <div ref={observerTarget} className="text-center py-6">
      {loadingMore ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" role="status">
            <span className="sr-only">Loading more...</span>
          </div>
          <span className="ml-3 text-gray-600">Fetching more data from API...</span>
        </div>
      ) : (
        <small className="text-sm text-gray-500">Scroll down to load more data</small>
      )}
    </div>
  );
});

InfiniteScrollTrigger.displayName = 'InfiniteScrollTrigger';

export default InfiniteScrollTrigger;
