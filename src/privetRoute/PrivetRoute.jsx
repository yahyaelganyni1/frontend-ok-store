import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivetRoute = ({ children }) => {
  const user = useSelector((state) => state.authentication?.user);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  // const jwt = localStorage.getItem('auth_token');
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivetRoute;
