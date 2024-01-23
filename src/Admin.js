import React from 'react';
import { Link } from 'react-router-dom';


const Admin = (orders) => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Link to="/admin/users">
        <button>View All Users</button>
      </Link>
      <Link to="/admin/products">
        <button>View All Products</button>
      </Link>
      
    </div>
  );
};

export default Admin;
