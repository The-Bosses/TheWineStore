import React from "react";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";

const AdminAddProduct = ({addProduct}) => {
    const navigate = useNavigate();

    const [newProduct, setNewProduct] = useState({
        name: '',
        type: '',
        price: 0,
        location: '',
        alcohol_percent: 0,
        description: '',
        is_vip: false

    })

    const handleSubmit = (event) => {
        event.preventDefault();
        addProduct(newProduct);
        navigate('/admin/products');
    }
    return (
        <div className="text-white min-h-screen flex items-center justify-center">
          <div className="bg-red-600 p-8 rounded shadow-lg w-full md:w-1/2">
            <h1 className="text-3xl font-bold mb-6">Add a new Product</h1>
            <div>
              <h2 className="text-xl font-bold mb-4">New Information:</h2>
              <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Name:</label>
                  <input
                    type="text"
                    placeholder="Name: Red Wine"
                    className="border rounded w-full p-2 text-black"
                    name="name"
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  />
                </div>
    

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Type:</label>
                  <input
                    type="text"
                    placeholder="Type: Pinot Noir"
                    className="border rounded w-full p-2 text-black"
                    onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                  />
                </div>
    

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Price:</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="9.99"
                    className="border rounded w-full p-2 text-black"
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  />
                </div>
    

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Region:</label>
                  <input
                    type="text"
                    placeholder="California"
                    className="border rounded w-full p-2 text-black"
                    onChange={(e) => setNewProduct({ ...newProduct, location: e.target.value })}
                  />
                </div>
    

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Alcohol Percentage:
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="12.5"
                    className="border rounded w-full p-2 text-black"
                    onChange={(e) => setNewProduct({ ...newProduct, alcohol_percent: e.target.value })}
                  />
                </div>
    

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">Description:</label>
                  <textarea
                    placeholder="This wine coming from ..."
                    className="border rounded w-full p-2 text-black"
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  />
                </div>
    

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    VIP Status: (True or False)
                  </label>
                  <input
                    type="text"
                    placeholder="False"
                    className="border rounded w-full p-2 text-black"
                    onChange={(e) => setNewProduct({ ...newProduct, is_vip: e.target.value })}
                  />
                </div>
    
               
    

                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Submit Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    };

export default AdminAddProduct;