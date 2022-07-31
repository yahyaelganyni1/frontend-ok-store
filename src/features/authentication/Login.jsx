import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './authenticationSlice';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(login({ user: { email, password } })).then(() => {
      setLoading(false);
    });
  };
  return (
    <form onSubmit={handleSubmit}>
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
