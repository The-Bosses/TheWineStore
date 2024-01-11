import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = ({ products }) => {
  const params = useParams();
  const productId = params.productId;
  const product = products.find((p) => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
};

export default ProductDetail;
