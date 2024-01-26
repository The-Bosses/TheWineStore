import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ auth, logout, orders }) => {
  return (
    <nav className="bg-white p-4 flex justify-between items-center">
      <Link to="/"><img src="public/Logos/plonk_logo_transparent.png" alt="Logo" className="ml-4 w-32 h-32 object-contain"/></Link>
      <Link to="/products" className="ml-4 text-black hover:bg-gray-100 px-4 py-2 rounded">Shop</Link>
      {!auth.id ? <Link to="/signup" className="ml-4 text-black hover:bg-gray-100 px-4 py-2 rounded">Create Account</Link> : null}
      {auth.id ? <Link to="/orders" className="ml-4 text-black hover:bg-gray-100 px-4 py-2 rounded">Orders ({auth.is_admin ? orders.length : orders.filter((order) => !order.is_cart).length})</Link> : null}
      {auth.id ? <Link to="/cart" className="ml-4 text-black hover:bg-gray-100 px-4 py-2 rounded">Cart</Link> : null}
      {auth.is_admin ? <Link to="/admin" className="ml-4 text-black hover:bg-gray-100 px-4 py-2 rounded">Admin</Link> : null}
      <span className="text-black">
        {/* Welcome {auth.username || 'Guest'}! */}
        {auth.id ? <button onClick={logout} className="ml-4 mr-4 bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded">Logout</button> : null}
        {auth.id ? <Link to="/profile"><button className="ml-4 mr-4 bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded">My Profile</button></Link> : null}
      </span>
    </nav>
  );
};

export default Navigation;
