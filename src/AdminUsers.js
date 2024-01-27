import React, { useState, useEffect } from 'react'; 
import api from './api';
import axios from 'axios'; 

import { Link } from 'react-router-dom';

const AdminUsers = ({ auth, users, setUsers}) => {
  

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
      <h2 className="text-3xl font-bold mb-6 mt-2 text-red-800">Admin Dashboard</h2>

      <table className="min-w-full border border-collapse">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="border p-2">Username</th>
            <th className="border p-2">VIP</th>
            <th className="border p-2">Admin</th>
            <th className="border p-2">Remove Admin Privileges</th>
            <th className="border p-2">Make Admin</th>
            <th className="border p-2">Remove VIP Privileges</th>
            <th className="border p-2">Make VIP</th>
            <th className="border p-2">User Info and Orders</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="even:bg-gray-100">
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.is_vip ? 'Yes' : 'No'}</td>
              <td className="border p-2">{user.is_admin ? 'Yes' : 'No'}</td>
              <td className="border p-2">
                {user.is_admin && (
                  <button onClick={() => handleMakeNAdmin(user.id, setUsers)}>Remove Admin Privileges</button>
                )}
              </td>
              <td className="border p-2">
                {!user.is_admin && (
                  <button onClick={() => handleMakeAdmin(user.id, setUsers)}>Make Admin</button>
                )}
              </td>
              <td className="border p-2">
                {user.is_vip && (
                  <button onClick={() => handleMakeNVIP(user.id, setUsers)}>Remove VIP Privileges</button>
                )}
              </td>
              <td className="border p-2">
                {!user.is_vip && (
                  <button onClick={() => handleMakeVIP(user.id, setUsers)}>Make VIP</button>
                )}
              </td>
              <td className="border p-2">
                <Link to={`/admin/users/${user.id}`}>
                  <button>View User Information</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default AdminUsers;
