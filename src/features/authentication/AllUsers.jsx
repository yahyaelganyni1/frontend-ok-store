import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllUsers,
  upgradeUserToSeller,
  downgradeSellerToUser,
} from './authenticationSlice';

const AllUsers = () => {
  const users = useSelector((state) => state.authentication.allUsers);

  const dispatch = useDispatch();

  const upgradeUser = (user) => {
    dispatch(upgradeUserToSeller(user));
    window.location.reload();
  };

  const downgradeSeller = (user) => {
    dispatch(downgradeSellerToUser(user));
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>
            <h3> {user.username} </h3>
            <p>{user.email}</p>
            <p> {user.role} </p>
            {user.role === 'user' ? (
              <button onClick={() => upgradeUser(user)}>
                Upgrade to Seller
              </button>
            ) : user.role === 'seller' ? (
              <button onClick={() => downgradeSeller(user)}>
                Downgrade to User
              </button>
            ) : (
              <h2>this user is an admin</h2>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
