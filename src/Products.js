import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Products = ({ products, cartItems, createLineItem, updateLineItem, auth }) => {
  const isVipUser = auth && auth.is_vip;
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to update search parameters when the input value changes
  const handleSearchInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Update the 'search' parameter in the URL
    setSearchParams({ search: newSearchTerm });
  };
    
  return (
    <div className="container px-4 bg-red-900">
      <h2 className="text-2xl font-bold mb-4 text-white">Available Wine List</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="border rounded-md px-2 py-1"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products
          .filter((product) => !product.is_vip || isVipUser)
          .filter((product) => !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase()))
          .map((product) => {
            const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);

            return (
              <div key={product.id} className=" m-6 border p-4 rounded-md bg-white">
                <img
                src={`${product.image}`}
                alt={product.name}
                className="w-full h-auto max-h-full object-contain mb-4"
                />
                <Link to={`/product/${product.id.toString()}`} className="m-3 text-red-900 text-2xl font-bold hover:underline">
                {product.name}
                </Link>
                <div className="m-3 text-red-900 text-xl">${product.price}</div>
                {auth.id ? (
                  cartItem ? (
                  <button className="m-3  inline-block px-5 py-3 rounded-lg focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm sm:text-base bg-red-900 text-red-50 hover:bg-red-950 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800" onClick={() => updateLineItem(cartItem)}>Add Another</button>
                  ) : (
                  <button className="m-3  inline-block px-5 py-3 rounded-lg focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm sm:text-base bg-red-900 text-red-50 hover:bg-red-950 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"onClick={() => createLineItem(product)}>Add</button>
                  )
                ) : null}
               </div>
            );
          })}
      </div>
    </div>
  );
};

export default Products;
