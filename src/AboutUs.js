import React from "react";
import useScrollToTop from "./ScrollToTop";

const AboutUs = () => {
  return (
    <div>
      {useScrollToTop()}
      
      <div className="relative">
        <img
          src="public/Images/about.png"
          alt="Plonk Winery"
          className="w-full h-100px object-cover"
        />

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-10">
          <h1 className="text-white text-4xl font-bold mb-8">About Plonk</h1>
        </div>

        <div className="container mx-auto my-12 p-8 bg-gray-100 relative z-10">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              Affordable wine that's actually good.
            </h2>
            <p className="mb-6">
              Welcome to Plonk, where good wine meets affordability. Plonk is
              the brainchild of Ben Boss, Tenzin Rojek, Robert McConnell, and
              Parker Munson, a team passionate about making quality wines
              accessible to everyone.
            </p>

            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="mb-6">
              Plonk was founded with a simple yet profound vision: to redefine
              the way people experience and enjoy wine without breaking the
              bank. We believe that everyone should have access to exceptional
              wines, and price should never be a barrier.
            </p>

            <h2 className="text-2xl font-bold mb-4">The Plonk Difference</h2>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Curated Selections</h3>
              <p>
                At Plonk, we take pride in our curated selection of wines, each
                handpicked by our team of experts. While we don't own vineyards,
                we meticulously source wines from around the world, ensuring
                that each bottle meets our high standards of quality and taste.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">
                Affordability without Compromise
              </h3>
              <p>
                All our wines are priced under $35 per bottle, proving that you
                don't need to spend a fortune to savor a remarkable wine. We
                believe in providing you with outstanding choices at prices that
                won't empty your pockets.
              </p>
            </div>

            <h2 className="text-2xl font-bold mb-4">Our Commitment</h2>
            <p className="mb-6">
              At Plonk, we are committed to making your wine experience
              delightful and budget-friendly. Whether you're a wine enthusiast
              or a novice, we invite you to explore our collection, discover new
              flavors, and raise a glass to the joy of affordable indulgence.
            </p>

            <p>Thank you for choosing Plonk.</p>
          </div>
        </div>
        {/* Footer */}
        <section className="bg-gray-100 border-t-2 p-8 flex items-center justify-between flex-col md:flex-row">
          <div className="mb-4 md:mb-0">
            <img
              src="../../public/Logos/plonk_logo_transparent.png"
              alt="Plonk Logo"
              className="w-16 h-16 object-contain"
            />
          </div>

          <div className="mb-4 md:mb-0">
            <p className="text-center md:text-left">
              Follow the creators on{" "}
              <a
                href="https://github.com/The-Bosses"
                className="text-blue-500 underline"
              >
                GitHub
              </a>
            </p>
          </div>

          <div>
            <p className="text-red-950 font-bold text-center md:text-left">
              Drink responsibly
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
