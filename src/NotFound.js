import React from "react";

const NotFound = () => {
  return (
    <div>
      <section
        className="bg-cover bg-center p-8 flex flex-col items-center justify-center text-center py-12"
        style={{
          backgroundImage: "url('public/Images/bw_blurry_cover_img.png')",
          height: "500px",
        }}
      >
        <div className="bg-red-950 text-white p-4 rounded-md absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
          <h1 className="text-6xl">404</h1>
          <p className="text-2xl">Page not found</p>
        </div>
      </section>
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
  );
};

export default NotFound;
