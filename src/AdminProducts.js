import React, { useState, useEffect } from 'react';
import api from './api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProductName, setNewProductName] = useState('');
  const [newProductAlcohol, setNewProductAlcohol] = useState('');
  const [newProductType, setNewProductType] = useState('');
  const [newProductLocation, setNewProductLocation] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductDescription, setNewProductDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        console.log('1')
      try {
        const productList = await api.fetchAdminProducts();
        console.log('2')
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleCreateProduct = async () => {
    try {
      // Check if user is admin (you might need to implement isAdmin logic)
      const isAdmin = true; // Replace with actual isAdmin logic

      if (isAdmin) {
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
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleMarkProductVIP = async (productId) => {
    try {
      // Check if user is admin (you might need to implement isAdmin logic)
      const isAdmin = true; // Replace with actual isAdmin logic

      if (isAdmin) {
        await api.markProductVIP(productId);
        const updatedProducts = await api.fetchAdminProducts();
        setProducts(updatedProducts);
      } else {
        console.error('User is not an admin. Cannot mark product as VIP.');
      }
    } catch (error) {
      console.error('Error marking product as VIP:', error);
    }
  };

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - Type: {product.type} - VIP: {product.is_vip ? 'Yes' : 'No'}
            <button onClick={() => handleMarkProductVIP(product.id)}>Mark as VIP</button>
          </li>
        ))}
      </ul>

      <h2>Create a New Product</h2>
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

      <button onClick={handleCreateProduct}>Create Product</button>
    </div>
  );
};

export default AdminProducts;
