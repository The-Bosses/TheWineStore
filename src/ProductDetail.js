import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const params = useParams();
  const productId = params.productId;
  const product = products.find((product) => {
    return product.id === productId
  })


  return (
    <div>
      {productId ? (
        <div>
          <h2>{product.name}</h2>
          <p>Price: {product.price}</p>
          <p>Description: {product.description}</p>
        </div>
      ) : (
        <div>Product not found.</div>
      )}
    </div>
  );
};

export default ProductDetail;
