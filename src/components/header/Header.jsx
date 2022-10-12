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
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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
              <h5 className="username"> welcome {user.username}</h5>
              <li>
                <Link to="/shopping-cart">shopping cart</Link>
              </li>
              {user.role === 'admin' || user.role === 'seller' ? (
                <li>
                  <Link to="/add-products">Add Product</Link>
                  {user.role === 'admin' ? (
                    <Link to="/all-users">All Users </Link>
                  ) : null}
                </li>
              ) : (
                <h5>you are a user</h5>
              )}
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
