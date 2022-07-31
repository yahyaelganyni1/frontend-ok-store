import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../../features/authentication/authenticationSlice';

const Header = () => {
  //   const isAuthenticated = localStorage.getItem('token') !== null;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const user = useSelector((state) => state.authentication.user.user);
  console.log(user);

  return (
    <header>
      <nav>
        <h4>welcome {user.username} </h4>
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

          <li>
            <Link to="/logout">Logout</Link>
          </li>

          <div>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
