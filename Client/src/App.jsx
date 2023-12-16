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
        <Route path="/appartement" element={<AppartementTable />}/>
        <Route path="/paiement" element={<PaiementTable />}/>
        <Route path="/client" element={<TenantTable />} />
        <Route path="/login" element={<ProtectedRoute><LoginPage /></ProtectedRoute>} />
        <Route path="/register" element={<RegisterForm />} />

        {/* Add more routes as needed */}
      </Routes>

    </>
  );
}

export default App;
