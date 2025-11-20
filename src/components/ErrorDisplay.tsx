import React from 'react';
import { ErrorDisplayProps } from '../types';

const ErrorDisplay: React.FC<ErrorDisplayProps> = React.memo(({ error }) => {
  return (
    <div className="w-full p-6">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded" role="alert">
        <h4 className="text-lg font-semibold text-red-800 mb-2">Error!</h4>
        <p className="text-red-700">{error}</p>
        <hr className="my-3 border-red-300" />
        <p className="text-sm text-red-600">
          Please check your internet connection and try refreshing the page.
        </p>
      </div>
    </div>
  );
});

ErrorDisplay.displayName = 'ErrorDisplay';

export default ErrorDisplay;
