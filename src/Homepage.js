import React, { useState } from "react";
import { Link } from "react-router-dom";
import AgeVerificationModal from "./AgeVerificationModal";
import Products from "./Products";
import Slider from "react-slick";

const Homepage = ({
  isAgeVerificationCompleted,
  onCloseAgeVerificationModal,
  onVerifyAge,
  products,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    draggable: true,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
    appendDots: (dots) => (
      <div style={{ position: "relative" }}>
        <div>{dots}</div>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: 10,
          height: 10,
          background: "white",
          borderRadius: "50%",
        }}
      ></div>
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

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
          Featured Wines
        </h2>
        {/* Featured Products Carousel */}
        <Slider {...settings} initialSlide={currentSlide}>
          {/* Featured Product Cards */}
          {products.slice(1, 8).map((product) => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <div
                key={product.id}
                className="bg-white max-w-xs border rounded overflow-hidden shadow-md ml-12 mb-4 transition-transform hover:shadow-lg hover:shadow-red-950"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
        {/* Navigation Buttons */}
        {/* <div className="text-center mt-4">
          <button
            onClick={() => setCurrentSlide(currentSlide - 1)}
            disabled={currentSlide === 0}
          >Previous</button>
          <button
            onClick={() => setCurrentSlide(currentSlide + 1)}
            disabled={currentSlide === products.slice(1, 8).length - 1}
          >Next</button>
        </div> */}
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
