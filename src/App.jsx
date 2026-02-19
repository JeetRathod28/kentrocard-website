
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import LandingPage from './LandingPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page at Root */}
        <Route path="/" element={<LandingPage />} />

        {/* Dynamic User Profile Route */}
        <Route path="/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
