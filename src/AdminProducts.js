import React, { useState, useEffect } from 'react';
import api from './api';
import { Link } from 'react-router-dom';
import AdminProductEdit from './AdminProductEdit';

const AdminProducts = ({products, auth}) => {
  const handleCreateProduct = async () => {
    try {
      if (auth.is_admin) {
        console.log("you are admin!")
      } 
    }
      catch (error) {
        console.error('Error creating product:', error);
      }

     
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 mt-2 text-red-800">Admin Dashboard</h2>

      <h2 className="text-2xl font-bold mb-2 text-red-800">All Products</h2>
      <Link to="/admin/products/createnew">
        <button className="bg-red-700 text-white px-4 py-2 rounded">Add New Product</button>
      </Link>

      <table className="min-w-full border border-collapse mt-4">
        <thead>
          <tr className="bg-red-600 text-white">
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="even:bg-gray-100">
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.type}</td>
              <td className="border p-2">
                <Link to={`/admin/products/${product.id.toString()}`}>
                  <button className="bg-red-400 text-white px-2 py-1 rounded">Edit Product</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
