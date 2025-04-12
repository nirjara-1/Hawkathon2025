import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DonorDashboard from './pages/DonorDashboard';
import NonprofitDashboard from './pages/NonprofitDashboard';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<App />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignupPage/>} /> 
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/nonprofit-dashboard" element={<NonprofitDashboard />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
