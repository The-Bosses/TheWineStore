import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-2 text-red-800">Admin Dashboard</h2>

      <Link to="/admin/users">
        <button className="bg-red-600 text-white py-2 px-4 rounded-md mb-2 hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300">
          View All Users
        </button>
      </Link>

      <Link to="/admin/products">
        <button className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:border-blue-300">
          View All Products
        </button>
      </Link>
    </div>
  );
};

export default Admin;
