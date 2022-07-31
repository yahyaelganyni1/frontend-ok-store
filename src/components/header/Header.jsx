import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          {!isAuthenticated ? (
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          ) : (
            <div>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
