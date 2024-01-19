import React, { useState } from 'react';
import api from './api';

const UserForm = ({createUser}) => {
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
    };
    
  
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>

        <label>
          Password:
          <input type="text" name="password" value={formData.password} onChange={handleChange} />
        </label>  

        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
  
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
  
        <label>
          Birth Date:
          <input type="text" name="birth_date" value={formData.birth_date} onChange={handleChange} />
        </label>
  
        <label>
          Address 1:
          <input type="text" name="address_1" value={formData.address_1} onChange={handleChange} />
        </label>
  
        <label>
          Address 2:
          <input type="text" name="address_2" value={formData.address_2} onChange={handleChange} />
        </label>
  
        <label>
          City:
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </label>
  
        <label>
          State:
          <input type="text" name="state" value={formData.state} onChange={handleChange} />
        </label>
  
        <label>
          Country:
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </label>
  
        <label>
          Postal Code:
          <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} />
        </label>
  
        <button type="submit">Submit</button>
      </form>
    );
  };
  
  export default UserForm;