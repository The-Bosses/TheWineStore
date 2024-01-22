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
        <h2>Admin Dashboard</h2>
        <h2>Edit Product</h2>
        <div>
        {productId ? (
          <div>
            <div>
                <h3>Current Information: </h3>
                <h3>{product.name}</h3>
                <p>{product.type}</p>
                <p>Price: {product.price}</p>
                <p>Region: {product.location} </p>
                <p>ABV: {product.alcohol_percent}%</p>
                <p>Description: {product.description}</p>
                <p>VIP Status: {product.is_vip ? "Yes" : "No"}</p>
            </div>
            <div>
                <h2>New Information:</h2>
                <form onSubmit={handleSubmit}>
              
                    <label>Name:</label>
                    <input type="text" value={productChanges.name} onChange={(e) => setProductChanges({...productChanges, name: e.target.value})} />
                    
                    <label>Type:</label>
                    <input type="text" value={productChanges.type} onChange={(e) => setProductChanges({...productChanges, type:e.target.value})} />
                    
                    <label>Price: (Number)</label>
                    <input type="number" value={productChanges.price} onChange={(e) => setProductChanges({...productChanges, price:e.target.value})} />

                    <label>Region:</label>
                    <input type="text" value={productChanges.location} onChange={(e) => setProductChanges({...productChanges, location: e.target.value})} />
                    
                    <label>Alcohol Percentage: (Number)</label>
                    <input type="text" value={productChanges.alcohol_percent} onChange={(e) => setProductChanges({...productChanges, alcohol_percent:e.target.value})} />

                    <label>Description:</label>
                    <textarea value={productChanges.description} onChange={(e) => setProductChanges({...productChanges, description:e.target.value})} />

                    <label>VIP Status: (True or False)</label>
                    <textarea type="text" value={productChanges.is_vip} onChange={(e) => setProductChanges({...productChanges, is_vip: e.target.value})} />

                    <button type="submit">Submit Changes</button>
                </form>
            </div>
        </div>
        ) : (
          <div>Product not found.</div>
        )}
      </div>
      </div>
    )
}

export default AdminProductEdit;