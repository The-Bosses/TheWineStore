import React, { useState } from 'react';
import api from './api';
import { useNavigate } from 'react-router-dom';

const UserForm = ({createUser}) => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      id: '',  
      username: '',
      password: '',
      name: '',
      email: '',
      birth_date: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      is_vip: false,
      is_admin: false,
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    function handleSubmit (e) {
        e.preventDefault();
        createUser(formData);
        navigate('/');
    };
    
  
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <div className="bg-red-600 p-8 rounded shadow-lg w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-6">Create User</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Password:</label>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Birth Date:</label>
              <input
                type="text"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Address 1:</label>
              <input
                type="text"
                name="address_1"
                value={formData.address_1}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Address 2:</label>
              <input
                type="text"
                name="address_2"
                value={formData.address_2}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">City:</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">State:</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Country:</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Postal Code:</label>
              <input
                type="text"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                className="border rounded w-full p-2 text-black"
              />
            </div>

            <button
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default UserForm;