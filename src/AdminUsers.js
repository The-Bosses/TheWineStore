import React, { useState, useEffect } from 'react'; 
import api from './api';
import axios from 'axios';

const AdminUsers = ({ auth }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.fetchUsers(setUsers);
  }, [auth]);

  const handleMakeAdmin = async (userId, setUsers) => {
    await api.makeUserAdmin({ userId, setUsers });
  };

  const handleMakeVIP = async (userId, setUsers) => {
    await api.makeUserVIP({userId, setUsers});
  }; 

  const handleMakeNAdmin = async (userId, setUsers) => {
    await api.makeUsernotAdmin({ userId, setUsers });
  };

  const handleMakeNVIP = async (userId, setUsers) => {
    await api.makeUsernotVIP({userId, setUsers});
  };

  

  

  return (
    <div>
      <h2>Admin Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - VIP: {user.is_vip ? 'Yes' : 'No'} - Admin: {user.is_admin ? 'Yes' : 'No'}
            {user.is_admin ? (
              <button onClick={() => handleMakeNAdmin(user.id, setUsers)}>Remove Admin Privileges</button>
            ) : (
              <button onClick={() => handleMakeAdmin(user.id, setUsers)}>Make Admin</button>
            )}
            {user.is_vip ? (
              <button onClick={() => handleMakeNVIP(user.id, setUsers)}>Remove VIP Privileges</button>
            ) : (
              <button onClick={() => handleMakeVIP(user.id, setUsers)}>Make VIP</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
  
            }
  



export default AdminUsers;
