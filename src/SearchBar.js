import React, { useState } from "react";
import { Link } from "react-router-dom";

const SearchBar = ({ products }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <label>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
        />
      </label>
      {searchTerm.length > 0 ? (
        <div>
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>
                <Link to={`/product/${product.id}`}>{product.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default SearchBar;
