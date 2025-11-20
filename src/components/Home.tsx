import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="w-full p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Welcome to Dashboard</h1>
      <div className="w-full">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h5 className="text-xl font-semibold mb-3 text-gray-800">Dashboard Overview</h5>
            <p className="text-gray-600 mb-4">
              This is a responsive dashboard application built with React and Tailwind CSS.
              Navigate to the <strong className="font-semibold">Data</strong> section to view and interact with data
              fetched from a public API.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="py-2 border-b border-gray-200">
                <strong className="text-gray-800">Features:</strong>
              </li>
              <li className="py-2 border-b border-gray-200 text-gray-600">✓ Responsive layout with sidebar navigation</li>
              <li className="py-2 border-b border-gray-200 text-gray-600">✓ API integration for data fetching</li>
              <li className="py-2 border-b border-gray-200 text-gray-600">✓ Table with filtering and searching</li>
              <li className="py-2 border-b border-gray-200 text-gray-600">✓ Pagination support</li>
              <li className="py-2 text-gray-600">✓ Error handling for API calls</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
