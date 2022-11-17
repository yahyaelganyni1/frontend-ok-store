import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import LogOut from '../../features/authentication/LogOut';
import { login } from '../../features/authentication/authenticationSlice';
import { fetchUser } from '../../features/authentication/authenticationSlice';
import './header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication?.user);
  const userRole = useSelector((state) => state.authentication?.user?.role);

  const loggedIn = user ? true : false;

  useEffect(() => {
    dispatch(fetchUser());

    return () => {
      dispatch(fetchUser());
    };
  }, [loggedIn]);

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
          {loggedIn && userRole === 'admin' ? (
            <li>
              <Link to="/all-users">All Users </Link>
            </li>
          ) : null}

          {(loggedIn && userRole === 'admin') || userRole === 'seller' ? (
            <li>
              <Link to="/add-products">add new product</Link>
            </li>
          ) : null}

          {loggedIn ? (
            <>
              <li>
                <Link to="/shopping-cart">shopping cart</Link>
              </li>

              <li>
                <LogOut />
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
