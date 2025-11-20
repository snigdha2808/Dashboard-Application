import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Data from './components/Data';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App min-h-screen bg-gray-50">
        <div className="flex flex-col md:flex-row">
          <Sidebar />
          <div className="flex-1 md:ml-48 lg:ml-56">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/data" element={<Data />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
