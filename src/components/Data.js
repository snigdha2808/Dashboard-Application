import React, { useState, useEffect, useRef, useCallback } from 'react';

const Data = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayedItemsCount, setDisplayedItemsCount] = useState(10);
  const [loadingMore, setLoadingMore] = useState(false);
  const itemsPerPage = 10;
  const observerTarget = useRef(null);

  // Fetch data from a public API (using JSONPlaceholder for users)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
        setFilteredData(result);
      } catch (err) {
        setError(err.message || 'Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter data based on search term
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredData(filtered);
    }
    setDisplayedItemsCount(itemsPerPage); // Reset displayed items when filtering
  }, [searchTerm, data]);

  // Load more items when scrolling
  const loadMore = useCallback(() => {
    if (loadingMore || displayedItemsCount >= filteredData.length) {
      return;
    }
    
    setLoadingMore(true);
    // Simulate a small delay for better UX
    setTimeout(() => {
      setDisplayedItemsCount((prev) => Math.min(prev + itemsPerPage, filteredData.length));
      setLoadingMore(false);
    }, 300);
  }, [loadingMore, displayedItemsCount, filteredData.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && displayedItemsCount < filteredData.length) {
          loadMore();
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
  }, [displayedItemsCount, filteredData.length, loadMore]);

  // Get displayed items
  const displayedItems = filteredData.slice(0, displayedItemsCount);
  const hasMore = displayedItemsCount < filteredData.length;

  if (loading) {
    return (
      <div className="container-fluid p-4">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ms-3">Loading data...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid p-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            Please check your internet connection and try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4">Data Table</h1>
      
      {/* Search/Filter Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, phone, or company..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <small className="form-text text-muted">
          Showing {filteredData.length} of {data.length} results
        </small>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Website</th>
              <th>Company</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {displayedItems.length > 0 ? (
              displayedItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.website}</td>
                  <td>{item.company?.name || 'N/A'}</td>
                  <td>{item.address?.city || 'N/A'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No data found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Infinite Scroll Trigger and Loading Indicator */}
      {hasMore && (
        <div ref={observerTarget} className="text-center py-4">
          {loadingMore ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading more...</span>
              </div>
              <span className="ms-3">Loading more data...</span>
            </div>
          ) : (
            <small className="text-muted">Scroll down to load more</small>
          )}
        </div>
      )}

      {/* End of data indicator */}
      {!hasMore && displayedItems.length > 0 && (
        <div className="text-center py-3">
          <small className="text-muted">
            Showing all {displayedItems.length} of {filteredData.length} results
          </small>
        </div>
      )}
    </div>
  );
};

export default Data;

