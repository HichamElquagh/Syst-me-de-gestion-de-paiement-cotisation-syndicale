// App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterForm from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './utils/ProtectedRoute';
import AppartementTable from './components/AppartementTable';
import Footer from './components/Footer';
import PaiementTable from './components/PaiementTable';
import TenantTable from './components/TenantTable';

function App() {
  return (
    <>
      {/* Fixed Navbar */}
      <Navbar />

      {/* Route content */}
      <Routes>
        {/* Use a ProtectedRoute component for routes that require authentication */}
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/appartement" element={<ProtectedRoute><AppartementTable /></ProtectedRoute>}/>
        <Route path="/paiement" element={<ProtectedRoute><PaiementTable /></ProtectedRoute>}/>
        <Route path="/client" element={<ProtectedRoute><TenantTable /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Add more routes as needed */}
      </Routes>

    </>
  );
}

export default App;
