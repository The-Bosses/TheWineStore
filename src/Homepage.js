import React, { useState } from "react";
import { Link } from "react-router-dom";
import AgeVerificationModal from "./AgeVerificationModal";
import Products from "./Products";

const Homepage = ({
  isAgeVerificationCompleted,
  onCloseAgeVerificationModal,
  onVerifyAge,
  products,
}) => {
  if (!isAgeVerificationCompleted) {
    return (
      <AgeVerificationModal
        onClose={onCloseAgeVerificationModal}
        onVerify={onVerifyAge}
      />
    );
  }

  return (
    <div>
      <section className="bg-gray-100 p-8 flex flex-col items-center justify-center text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Curated wines on a dime.</h1>
        <p className="text-lg mb-4">Good wine doesn't have to be expensive.</p>
        <Link to="/products">
          <button className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded">
            Shop Wines
          </button>
        </Link>
      </section>

      {/* Featured Products Section */}
      <section className="bg-red-900 py-12">
        <h2 className="text-2xl text-white font-bold ml-4 mb-6">
          Featured Products
        </h2>
        
          {/* Featured Product Cards */}
          <div className="flex justify-center space-x-4">
          {products.slice(0,5).map((product) => (
            <div
              key={product.id}
              className="bg-white max-w-xs border rounded overflow-hidden shadow-md transition duration-300 ease-in-out transform hover:shadow-lg"
            >
              <img
                src={product.image} 
                alt={product.name}
                className="w-36 h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl text-black font-bold mb-2">{product.name}</h3>
                <Link to="/product/:id"><button className="ml-4 bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded">More</button></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section className="bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>

    </div>
  );
};

export default Homepage;
