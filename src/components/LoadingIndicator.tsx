import React from 'react';
import { LoadingIndicatorProps } from '../types';

const LoadingIndicator: React.FC<LoadingIndicatorProps> = React.memo(({ message = 'Loading data...' }) => {
  return (
    <div className="w-full p-6">
      <div className="flex justify-center items-center" style={{ minHeight: '400px' }}>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <span className="ml-3 text-gray-600">{message}</span>
      </div>
    </div>
  );
});

LoadingIndicator.displayName = 'LoadingIndicator';

export default LoadingIndicator;
