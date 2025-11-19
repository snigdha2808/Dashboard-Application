import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Data from './components/Data';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="row g-0">
          <Sidebar />
          <div className="col-md-9 col-lg-10 ms-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/data" element={<Data />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
