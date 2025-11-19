import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="col-md-3 col-lg-2 sidebar bg-dark text-white vh-100 position-fixed">
      <div className="p-3">
        <h4 className="mb-4">Dashboard</h4>
        <nav className="nav flex-column">
          <Link
            to="/"
            className={`nav-link text-white mb-2 ${
              location.pathname === '/' ? 'active bg-primary rounded' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to="/data"
            className={`nav-link text-white mb-2 ${
              location.pathname === '/data' ? 'active bg-primary rounded' : ''
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

