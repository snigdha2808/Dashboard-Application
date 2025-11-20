import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container-fluid p-4">
      <h1 className="mb-4">Welcome to Dashboard</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Dashboard Overview</h5>
              <p className="card-text">
                This is a responsive dashboard application built with React and Bootstrap.
                Navigate to the <strong>Data</strong> section to view and interact with data
                fetched from a public API.
              </p>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">
                  <strong>Features:</strong>
                </li>
                <li className="list-group-item">✓ Responsive layout with sidebar navigation</li>
                <li className="list-group-item">✓ API integration for data fetching</li>
                <li className="list-group-item">✓ Table with filtering and searching</li>
                <li className="list-group-item">✓ Pagination support</li>
                <li className="list-group-item">✓ Error handling for API calls</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

