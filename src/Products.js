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
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold mb-4">Available Wine List</h2>
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
              <div key={product.id} className="bg-white rounded-md p-4 border border-gray-300 shadow-md">
                <Link to={`/product/${product.id.toString()}`} className="text-blue-500 hover:underline">
                  {product.name}
                </Link>
                <div className="text-gray-700">${product.price}</div>
                {auth.id ? (
                  cartItem ? (
                    <button onClick={() => updateLineItem(cartItem)}>Add Another</button>
                  ) : (
                    <button onClick={() => createLineItem(product)}>Add</button>
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
