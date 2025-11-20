import React from 'react';

const LoadingIndicator = React.memo(({ message = 'Loading data...' }) => {
  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3">{message}</span>
      </div>
    </div>
  );
});

LoadingIndicator.displayName = 'LoadingIndicator';

export default LoadingIndicator;

