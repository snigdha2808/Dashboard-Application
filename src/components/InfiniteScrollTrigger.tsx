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
    <div ref={observerTarget} className="text-center py-4">
      {loadingMore ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading more...</span>
          </div>
          <span className="ms-3">Fetching more data from API...</span>
        </div>
      ) : (
        <small className="text-muted">Scroll down to load more data</small>
      )}
    </div>
  );
});

InfiniteScrollTrigger.displayName = 'InfiniteScrollTrigger';

export default InfiniteScrollTrigger;

