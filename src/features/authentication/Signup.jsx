import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from './authenticationSlice';
import { Navigate } from 'react-router-dom';
import './signup.scss';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      signup({
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
          username,
        },
      }),
    ).then(() => {
      setLoading(false);
    });

    setEmail('');
    setPassword('');
    setPasswordConfirmation('');
    setUsername('');
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <h1>sign up</h1>
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
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        placeholder="Password Confirmation"
        required
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <button type="submit">{loading ? 'Loading...' : 'Signup'}</button>
    </form>
  );
};

export default Signup;
