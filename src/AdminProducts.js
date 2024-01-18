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

      /*if (isAdmin) {
        await api.createProduct({
          name: newProductName,
          alcohol_percent: newProductAlcohol,
          type: newProductType,
          location: newProductLocation,
          price: newProductPrice,
          description: newProductDescription,
        });

        const updatedProducts = await api.fetchAdminProducts();
        setProducts(updatedProducts);

        // Reset input fields
        setNewProductName('');
        setNewProductAlcohol('');
        setNewProductType('');
        setNewProductLocation('');
        setNewProductPrice('');
        setNewProductDescription('');
      } else {
        console.error('User is not an admin. Cannot create a product.');
      }
    } */ 
  }

  return (
    <div>
      <h2>All Products</h2>
      
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Type: {product.type}
            <span> <Link to={`/admin/products/${product.id.toString()}`}><button >Edit Product</button></Link> </span>
          </li>
        ))}
      </ul>

     {/*  <h2>Create a New Product</h2>
      <label>Name:</label>
      <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />

      <label>Alcohol Percentage:</label>
      <input type="text" value={newProductAlcohol} onChange={(e) => setNewProductAlcohol(e.target.value)} />

      <label>Type:</label>
      <input type="text" value={newProductType} onChange={(e) => setNewProductType(e.target.value)} />

      <label>Origin Location:</label>
      <input type="text" value={newProductLocation} onChange={(e) => setNewProductLocation(e.target.value)} />

      <label>Price:</label>
      <input type="text" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />

      <label>Description:</label>
      <textarea value={newProductDescription} onChange={(e) => setNewProductDescription(e.target.value)} />

      <button onClick={handleCreateProduct}>Create Product</button> */}
    </div>
  );
};

export default AdminProducts;
