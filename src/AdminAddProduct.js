import React from "react";
import { useState } from "react";

const AdminAddProduct = ({addProduct}) => {
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
    }
    return (
            <div>
            <h1>Add a new Product</h1>
                <div>
                    <h2>New Information:</h2>
                    <form onSubmit={handleSubmit}>
                  
                        <label>Name:</label>
                        <input type="text" placeholder="Name: Red Wine" onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                        
                        <label>Type:</label>
                        <input type="text" placeholder="type: Pinot Noir" onChange={(e) => setNewProduct({...newProduct, type:e.target.value})} />
                        
                        <label>Price: (Number)</label>
                        <input type="number" step="0.01" placeholder="9.99" onChange={(e) => setNewProduct({...newProduct, price:e.target.value})} />
    
                        <label>Region:</label>
                        <input type="text" placeholder="California" onChange={(e) => setNewProduct({...newProduct, location: e.target.value})} />
                        
                        <label>Alcohol Percentage: (Number)</label>
                        <input type="number" step="0.01" placeholder="12.5" onChange={(e) => setNewProduct({...newProduct, alcohol_percent:e.target.value})} />
    
                        <label>Description:</label>
                        <textarea placeholder="This wine coming from ..." onChange={(e) => setNewProduct({...newProduct, description:e.target.value})} />
    
                        <label>VIP Status: (True or False)</label>
                        <textarea type="text" placeholder="False" onChange={(e) => setNewProduct({...newProduct, is_vip: e.target.value})} />
    
                        <button type="submit">Submit Changes</button>
                    </form>
                </div>
            </div>
        )
}

export default AdminAddProduct;