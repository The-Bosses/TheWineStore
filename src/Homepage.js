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
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
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
      {/* Home Page Intro */}
      <section
        className="bg-cover bg-center p-8 flex flex-col items-center justify-center text-center py-12"
        style={{
          backgroundImage: "url('public/Images/bw_cover_img.png')",
          height: "500px",
        }}
      >
        <div className="bg-red-900 text-white p-4 rounded-md absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
          <h2 className="text-5xl font-bold mt-4 mb-4">Curated Wines on a Dime</h2>
          <p className="text-lg mb-4">Good wine doesn't have to be expensive.</p>
          <Link to="/products">
          <button className="bg-white hover:bg-gray-100 text-red-900 px-4 py-2 rounded mt-4 mb-4">
            Shop Plonk
          </button>
        </Link>
        </div>
        
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
                  className="object-contain size-60 mt-4 mb-4 flex-shrink-0 mx-auto"
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
      </section>

      {/* About Us */}
      <section className="bg-white p-8 flex items-center justify-center flex-col md:flex-row">
        <div className="md:w-3/5 mb-2 md:mb-0">
          <img
            src="public/Images/bw_about_logo_img.png"
            alt="About Us"
            className="ml-28 w-3/5 h-auto object-cover rounded"
          />
        </div>

        <div className="md:w-2/3 md:ml-2 mt-0">
          <h2 className="text-2xl font-bold mb-4">Here's to the VIP's!</h2>
          <p className="text-lg max-w-md">
            Not a member? Create an account today to get instant access to VIP
            products.
          </p>
          <Link to="/signup">
            <button className="bg-red-800 hover:bg-red-900 text-white px-4 py-2 rounded mt-4">
              Sign Up
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <section className="bg-gray-100 p-8 flex items-center justify-center flex-col md:flex-row">
        <div>
          <p>
            Made by TENZIN & Co.    
          </p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
