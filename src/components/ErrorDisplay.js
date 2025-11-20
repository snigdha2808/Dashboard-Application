import React from 'react';

const ErrorDisplay = React.memo(({ error }) => {
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
});

ErrorDisplay.displayName = 'ErrorDisplay';

export default ErrorDisplay;

