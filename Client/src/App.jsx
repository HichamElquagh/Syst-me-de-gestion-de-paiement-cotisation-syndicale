// App.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterForm from './pages/RegisterPage'
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './utils/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <LandingPage />      
          </ProtectedRoute>
       }/>
      <Route path="/login" element={
              <ProtectedRoute>
              <LoginPage />
              </ProtectedRoute>
} />
      <Route path="/register" element={
                <ProtectedRoute>
                <RegisterForm />
                </ProtectedRoute>
} />

    </Routes>
  );
}

export default App;
