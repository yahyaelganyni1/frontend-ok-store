import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import LogOut from '../../features/authentication/LogOut';
import { fetchUser } from '../../features/authentication/authenticationSlice';
import './header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication.user);
  // const loggedIn = useSelector((state) => state.authentication.user.logged_in);

  useEffect(() => {
    // if (user) {
    dispatch(fetchUser());
    // }
  }, [dispatch]);

  console.log(user);

  return (
    <header className="header">
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

          {!user ? (
            <div>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </div>
          ) : (
            <div>
              <LogOut />
              <h5 className="username"> welcome {user.user.username}</h5>
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
