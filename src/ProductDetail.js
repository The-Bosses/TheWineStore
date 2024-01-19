import React from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";


const ProductDetail = ({ products,reviews }) => {
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
          <p>Region: {product.location} </p>
          <p>ABV: {product.alcohol_percent}%</p>
          <p>Description: {product.description}</p>
          <Reviews reviews={reviews}/>
          <ReviewForm/>
        </div>
        
      ) : (
        <div>Product not found.</div>
      )}
    </div>
  );
};

export default ProductDetail;
