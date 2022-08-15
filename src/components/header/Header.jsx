import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import LogOut from '../../features/authentication/LogOut';
import { fetchUser } from '../../features/authentication/authenticationSlice';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authentication);
  useEffect(() => {
    if (!user.user === null) {
      dispatch(fetchUser());
    }
  }, [dispatch]);
  // console.log(user);
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

          {user.user === null ? (
            <div>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">SignUp</Link>
              </li>
            </div>
          ) : (
            <LogOut />
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
