import React, { useState } from "react";
import { Link } from "react-router-dom";
import AgeVerificationModal from "./AgeVerificationModal";

const Homepage = ({ isAgeVerificationCompleted, onCloseAgeVerificationModal, onVerifyAge }) => {
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
      <section className="bg-gray-100 p-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-4">Curated wines on a dime.</h1>
        <p className="text-lg mb-4">
          Good wine doesn't have to be expensive.
        </p>
        <Link to="/products"><button className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded">Shop Wines</button></Link>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        {/* Featured Products Grid or Carousel */}
        <div className="flex space-x-4">
          {/* Featured Product Card (Repeat as needed) */}
          <div className="max-w-xs border rounded overflow-hidden shadow-md">
            <img
              src="placeholder_image.jpg"
              alt="Product"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Product Title</h3>
              <p className="text-gray-700">Product description goes here.</p>
              {/* Additional product details */}
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-4">About Us</h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </section>

      {/* Other content */}
    </div>
  );
};

export default Homepage;
