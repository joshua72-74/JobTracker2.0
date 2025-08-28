import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const location = useLocation();

  // If no token, redirect to login page, preserving intended path in state
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Token exists, render children (protected component)
  return children;
};

export default PrivateRoute;
