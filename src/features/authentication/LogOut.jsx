import React from 'react';
import { logout } from './authenticationSlice';
import { useDispatch, useSelector } from 'react-redux';

const LogOut = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication);

  const HandleLogout = () => {
    dispatch(logout());
  };

  return <button onClick={HandleLogout}>LogOut</button>;
};

export default LogOut;
