import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth})=> {
  const isVipUser = auth && auth.is_vip
  
  return (
    <div>
      <h2>Available Wine List</h2>
      <ul>
        {
          products.map( product => {
            const cartItem = cartItems.find(lineItem => lineItem.product_id === product.id);
            if (product.is_vip && !isVipUser) {
              return null;
            }
            
            return (
              <li key={ product.id }>
                <Link to={`/product/${product.id.toString()}`}>{ product.name }</Link>
              
                 ${ product.price }
                {
                  auth.id ? (
                    cartItem ? <button onClick={ ()=> updateLineItem(cartItem)}>Add Another</button>: <button onClick={ ()=> createLineItem(product)}>Add</button>
                  ): null 
                }
              </li>
            );
          })
        }
      </ul>

    </div>
  );
};



export default Products;
