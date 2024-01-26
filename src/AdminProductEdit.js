import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AdminProductEdit = ({products, editProduct}) => {
    const params = useParams();
    const productId = params.id;
    const product = products.find((product) => {
        return product.id === productId
  })

  function handleSubmit (event) {
        event.preventDefault();
        editProduct(productChanges);
  }
  
  const [productChanges, setProductChanges] = 
        useState({
            id: product.id,
            name: product.name,
            type: product.type,
            price: product.price,
            location: product.location,
            alcohol_percent: product.alcohol_percent,
            description: product.description,
            is_vip: product.is_vip
        })

        return (
            <div>
              <h2 className="text-3xl font-bold mb-6 mt-2 text-red-800">Admin Dashboard</h2>
              <h2 className="text-2xl font-bold mb-4 text-red-700">Edit Product</h2>
        
              {productId ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-red-600">Current Information:</h3>
                    <p className="mb-2">{product.name}</p>
                    <p className="mb-2">Type: {product.type}</p>
                    <p className="mb-2">Price: ${product.price}</p>
                    <p className="mb-2">Region: {product.location}</p>
                    <p className="mb-2">ABV: {product.alcohol_percent}%</p>
                    <p className="mb-2">Description: {product.description}</p>
                    <p>VIP Status: {product.is_vip ? 'Yes' : 'No'}</p>
                  </div>
        
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-red-600">New Information:</h2>
                    <form onSubmit={handleSubmit}>
                     
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name:</label>
                        <input
                          type="text"
                          className="border rounded w-full p-2"
                          value={productChanges.name}
                          onChange={(e) => setProductChanges({ ...productChanges, name: e.target.value })}
                        />
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type:</label>
                        <input
                          type="text"
                          className="border rounded w-full p-2"
                          value={productChanges.type}
                          onChange={(e) => setProductChanges({ ...productChanges, type: e.target.value })}
                        />
                      </div>
        
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Price:</label>
                        <input
                          type="number"
                          step="0.01"
                          className="border rounded w-full p-2"
                          value={productChanges.price}
                          onChange={(e) => setProductChanges({ ...productChanges, price: e.target.value })}
                        />
                      </div>
        
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Region:</label>
                        <input
                          type="text"
                          className="border rounded w-full p-2"
                          value={productChanges.location}
                          onChange={(e) => setProductChanges({ ...productChanges, location: e.target.value })}
                        />
                      </div>
        
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alcohol Percentage:</label>
                        <input
                          type="number"
                          step="0.01"
                          className="border rounded w-full p-2"
                          value={productChanges.alcohol_percent}
                          onChange={(e) => setProductChanges({ ...productChanges, alcohol_percent: e.target.value })}
                        />
                      </div>
        
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description:</label>
                        <textarea
                          className="border rounded w-full p-2"
                          value={productChanges.description}
                          onChange={(e) => setProductChanges({ ...productChanges, description: e.target.value })}
                        />
                      </div>
        
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          VIP Status: (True or False)
                        </label>
                        <input
                          type="text"
                          className="border rounded w-full p-2"
                          value={productChanges.is_vip}
                          onChange={(e) => setProductChanges({ ...productChanges, is_vip: e.target.value })}
                        />
                      </div>
        
                      <button
                        type="submit"
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                      >
                        Submit Changes
                      </button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="text-red-600">Product not found.</div>
              )}
            </div>
          );
        };
export default AdminProductEdit;