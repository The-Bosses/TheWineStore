import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useScrollToTop from "./ScrollToTop";

const Products = ({
  products,
  cartItems,
  createLineItem,
  updateLineItem,
  auth,
  reviews,
}) => {
  const [displayedProducts, setDisplayedProducts] = useState([...products]);
  const isVipUser = auth && auth.is_vip;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("none");
  const [filter, setFilter] = useState("none");

  // Function to update search parameters when the input value changes
  const handleSearchInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Update the 'search' parameter in the URL
    setSearchParams({ search: newSearchTerm });
  };

  useEffect(() => {
    const filterAndSort = () => {
      let filteredandSorted = [...products];

      if (filter === "vip") {
        filteredandSorted = filteredandSorted.filter(
          (product) => product.is_vip
        );
      } else if (filter === "red") {
        filteredandSorted = filteredandSorted.filter(
          (product) =>
            product.type === "Cabernet Sauvignon" ||
            product.type === "Pinot Noir" ||
            product.type === "Zinfandel"
        );
      } else if (filter === "white") {
        filteredandSorted = filteredandSorted.filter(
          (product) =>
            product.type === "Cava" ||
            product.type === "Chardonnay" ||
            product.type === "Pinot Grigio" ||
            product.type === "Riesling" ||
            product.type === "Sauvignon Blanc" ||
            product.type === "Prosecco"
        );
      } else if (filter === "rosé") {
        filteredandSorted = filteredandSorted.filter(
          (product) =>
            product.type === "Rosé" || product.type === "Sparkling Rosé"
        );
      } else if (filter === "sparkling") {
        filteredandSorted = filteredandSorted.filter(
          (product) =>
            product.type === "Prosecco" ||
            product.type === "Sparkling Rosé" ||
            product.type === "Cava"
        );
      } else if (filter === "oceania") {
        filteredandSorted = filteredandSorted.filter(
          (product) =>
            product.location === "Australia" ||
            product.location === "New Zealand"
        );
      } else if (filter === "europe") {
        filteredandSorted = filteredandSorted.filter(
          (product) =>
            product.location === "Germany" ||
            product.location === "Italy" ||
            product.location === "France" ||
            product.location === "Spain"
        );
      } else if (filter === "northAmerica") {
        filteredandSorted = filteredandSorted.filter(
          (product) => product.location === "United States"
        );
      } else if (filter === "southAmerica") {
        filteredandSorted = filteredandSorted.filter(
          (product) => product.location === "Argentina"
        );
      }

      if (sortBy === "lowToHigh") {
        filteredandSorted.sort((a, b) => a.price - b.price);
      } else if (sortBy === "highToLow") {
        filteredandSorted.sort((a, b) => b.price - a.price);
      } else if (sortBy === "weakToStrong") {
        filteredandSorted.sort((a, b) => a.alcohol_percent - b.alcohol_percent);
      } else if (sortBy === "strongToWeak") {
        filteredandSorted.sort((a, b) => b.alcohol_percent - a.alcohol_percent);
      }
      setDisplayedProducts(filteredandSorted);
    };

    filterAndSort();
  }, [products, sortBy, filter]);

  const handleClearAll = () => {
    setFilter("none");
    setSortBy("none");

    document.getElementById("filterDropdown").selectedIndex = 0;
    document.getElementById("sortDropdown").selectedIndex = 0;
  };

  const searchProductFound = () => {
    let searchFind = displayedProducts.filter(
      (product) =>
        !searchTerm ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return searchFind;
  };
  return (
    <div>
      {useScrollToTop()}
      <div className="bg-red-950">
        <h2 className="ml-2 text-4xl font-bold mb-4 text-white">Our Wines</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchInputChange}
            className="border rounded-md px-2 py-1 ml-2"
          />
        </div>
        <div className="flex">
          <div className="mb-4">
            <select
              onChange={(event) => {
                setFilter(event.target.value);
              }}
              id="filterDropdown"
              className="w-96 p-2 border rounded ml-2"
            >
              <option value="none">Filter</option>
              {isVipUser ? <option value="vip">VIP Products</option> : null}
              <optgroup label="Type">
                <option value="red">Red</option>
                <option value="white">White</option>
                <option value="rosé">Rosé</option>
                <option value="sparkling">Sparkling</option>
              </optgroup>
              <optgroup label="Region">
                <option value="europe">Europe</option>
                <option value="australia">Oceania</option>
                <option value="northAmerica">North America</option>
                <option value="southAmerica">South America</option>
              </optgroup>
            </select>
          </div>

          <div className="mb-4">
            <select
              onChange={(event) => {
                setSortBy(event.target.value);
              }}
              id="sortDropdown"
              className="w-96 p-2 border rounded ml-2"
            >
              <option value="none">Sort by ...</option>
              <option value="lowToHigh"> Price: Low to High</option>
              <option value="highToLow">Price: High to Low </option>
              <option value="weakToStrong">
                Alcohol Percentage: Low to High
              </option>
              <option value="strongToWeak">
                Alcohol Percentage: High to Low
              </option>
            </select>
          </div>
        </div>

        <div>
          {filter === "none" && sortBy === "none" ? null : (
            <button
              className=" ml-2 w-32 px-3 py-2 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm sm:text-base bg-red-800 text-red-50 hover:bg-red-900 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"
              onClick={() => {
                handleClearAll();
              }}
            >
              Clear all
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {displayedProducts

            .filter((product) => !product.is_vip || isVipUser)
            .filter(
              (product) =>
                !searchTerm ||
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((product) => {
              const cartItem = cartItems.find(
                (lineItem) => lineItem.product_id === product.id
              );

              return (
                <div
                  key={product.id}
                  className="m-6 border p-4 rounded-md bg-white flex flex-col items-center"
                >
                  <div className="flex-grow text-center">
                    <img
                      src={`${product.image}`}
                      alt={product.name}
                      className="object-contain size-40 mb-4 shadow-md flex-shrink-0 mx-auto"
                    />
                    <Link
                      to={`/product/${product.id.toString()}`}
                      className="text-red-900 text-xl font-bold hover:underline"
                    >
                      {product.name}
                    </Link>
                    <div className="text-red-900 text-base">{product.type}</div>
                    <div className="text-red-900 text-base mb-2">
                      ${product.price}
                    </div>
                  </div>
                  {auth.id ? (
                    cartItem ? (
                      <button
                        className="mx-auto px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-xs sm:text-sm bg-red-900 text-red-50 hover:bg-red-950 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"
                        onClick={() => updateLineItem(cartItem)}
                      >
                        Add Another
                      </button>
                    ) : (
                      <button
                        className="mx-auto px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-xs sm:text-sm bg-red-900 text-red-50 hover:bg-red-950 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"
                        onClick={() => createLineItem(product)}
                      >
                        Add to cart
                      </button>
                    )
                  ) : null}
                </div>
              );
            })}
          {searchProductFound().length === 0 && (
            <p className="text-white text-xl font-bold ml-2">
              No wines found.{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
