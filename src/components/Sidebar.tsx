import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-full md:w-48 lg:w-56 bg-gray-900 text-white h-auto md:h-screen md:fixed md:left-0 md:top-0 z-10">
      <div className="p-6">
        <h4 className="mb-6 text-xl font-semibold">Dashboard</h4>
        <nav className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              location.pathname === '/' 
                ? 'bg-blue-600 text-white font-medium' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/data"
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              location.pathname === '/data' 
                ? 'bg-blue-600 text-white font-medium' 
                : 'text-gray-300 hover:bg-gray-800 hover:text-white'
            }`}
          >
            Data
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
