import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

const PrivetRoute = ({ children }) => {
  const jwt = localStorage.getItem('auth_token');
  console.log(jwt);
  return jwt ? children : <Navigate to="/login" />;
};

export default PrivetRoute;
