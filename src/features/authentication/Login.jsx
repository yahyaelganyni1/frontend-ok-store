import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './authenticationSlice';
import { isLoggedIn } from './authenticationSlice';
import { Navigate } from 'react-router-dom';
import './login.scss';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  // const loggedIn = useSelector((state) => state.authentication.isLoggedIn);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ user: { email, password } }));

    setEmail('');
    setPassword('');
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h1>login</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">{loading ? 'Loading...' : 'Login'}</button>
    </form>
  );
};

export default Login;
