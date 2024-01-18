//this is not ready yet to be used. going to bed lol


import React, { useState, useEffect } from 'react'; 
import api from './api';
import axios from 'axios';

const AdminUsers = ({ auth }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const userList = await axios.get('/api/admin/users');
    //     setUsers(userList.data);
    //   } catch (error) {
    //     console.error('Error fetching users:', error);
    //   }
    // };

    api.fetchUsers(setUsers);
  }, [auth]);

  // const handleMakeVIP = async (userId) => {
  //   try {
  //     await makeUserVIP(userId);
  //     const updatedUsers = await fetchUsers();
  //     setUsers(updatedUsers);
  //   } catch (error) {
  //     console.error('Error making user VIP:', error);
  //   }
  // };

  // const handleMakeAdmin = async (userId) => {
  //   try {
  //     await makeUserAdmin(userId);
  //     const updatedUsers = await fetchUsers();
  //     setUsers(updatedUsers);
  //   } catch (error) {
  //     console.error('Error making user Admin:', error);
  //   }
  // };

  return (
    <div>
      <h2>Admin Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - VIP: {user.is_vip ? 'Yes' : 'No'} - Admin: {user.is_admin ? 'Yes' : 'No'}
            {/* <button onClick={() => handleMakeVIP(user.id)}>Make VIP</button>
            <button onClick={() => handleMakeAdmin(user.id)}>Make Admin</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminUsers;
