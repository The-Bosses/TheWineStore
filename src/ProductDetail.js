import React from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
//import { createReview } from "../server/db";


const ProductDetail = ({
  products,
  addToWishList,
  wishList,
  removeFromWishList,
  setWishList,
  users,
  reviews,
  createReview
}) => {

  const params = useParams();
  const productId = params.productId;
  const product = products.find((product) => {
    return product.id === productId;
  });


  const isInWishList = () => {
    const item = wishList.find((wishListItem) => {
      return wishListItem.product_id === productId;
    });
    return item !== undefined;
  };


  return (
    <div>
      
      {productId ? (
        <div>

          <h2>
            {product.name}
            {isInWishList() ? (
              <span>
              <button onClick={() => removeFromWishList(product)}>
                Remove from Wish List
              </button>
            </span>
            ) : (
              <span>
                <button onClick={() => addToWishList(product)}>
                  Add to Wish List
                </button>
              </span>
            )}
          </h2>
          <p>{product.type}</p>
          <p>Price: {product.price}</p>
          <p>Region: {product.location} </p>
          <p>ABV: {product.alcohol_percent}%</p>
          <p>Description: {product.description}</p>
          <Reviews reviews={reviews}/>
          <ReviewForm users={users} products={products} createReview={createReview}/>
        </div>
        
      ) : (
        <div>Product not found.</div>
      )}
    </div>
  );
};

export default ProductDetail;
