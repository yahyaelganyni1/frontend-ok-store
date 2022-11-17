import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getAllUsers,
  upgradeUserToSeller,
  downgradeSellerToUser,
  searchUser,
} from './authenticationSlice';

const AllUsers = () => {
  const users = useSelector((state) => state.authentication.allUsers);

  const searchResults = useSelector(
    (state) => state.authentication.searchResults,
  );

  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  // const renderUsers = useRef(users);

  const [updatedUsers, setUpdatedUsers] = useState(false);

  const upgradeUser = (user) => {
    dispatch(upgradeUserToSeller(user));
    setUpdatedUsers((prev) => !prev);
  };

  const downgradeSeller = (user) => {
    dispatch(downgradeSellerToUser(user));
    setUpdatedUsers((prev) => !prev);
  };

  console.log('hello');

  useEffect(() => {
    dispatch(getAllUsers());

    return () => {
      dispatch(getAllUsers());
    };
  }, [updatedUsers, search]);

  document.title = 'All Users';

  // search without a form and without a button
  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
    dispatch(searchUser(search));
  };

  return (
    <div>
      <h1>users</h1>
      <input
        type="text"
        placeholder="search user"
        value={search}
        onChange={(e) => handleSearch(e)}
      />
      <section>
        {
          // if search is empty show all users
          search === ''
            ? users.map((user) => (
                <div key={user.id}>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p>{user.role}</p>

                  {user.role === 'admin' ? null : user.role === 'user' ? (
                    <button onClick={() => upgradeUser(user)}>upgrade</button>
                  ) : (
                    <button onClick={() => downgradeSeller(user)}>
                      downgrade
                    </button>
                  )}
                </div>
              ))
            : // if search is not empty show search results
              searchResults.map((user) => (
                <div key={user.id}>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p>{user.role}</p>
                  {user.role === 'user' ? (
                    <button onClick={() => upgradeUser(user)}>upgrade</button>
                  ) : (
                    <button onClick={() => downgradeSeller(user)}>
                      downgrade
                    </button>
                  )}
                </div>
              ))
        }
      </section>
    </div>
  );
};

export default AllUsers;
