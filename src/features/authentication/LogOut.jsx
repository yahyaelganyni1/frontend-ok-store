import React from 'react';
import { logout } from './authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authentication);

  const HandleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return <button onClick={HandleLogout}>LogOut</button>;
};

export default LogOut;
