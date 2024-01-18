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
          <p>{product.type}</p>
          <p>Price: {product.price}</p>
          <p>Region: {product.location} </p>
          <p>ABV: {product.alcohol_percent}%</p>
          <p>Description: {product.description}</p>
          <p>Reviews: {product.reviews}</p>
        </div>
      ) : (
        <div>Product not found.</div>
      )}
    </div>
  );
};

export default ProductDetail;
