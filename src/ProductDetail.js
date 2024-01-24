import React from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import ReviewsList from "./Reviews";

const ProductDetail = ({
  products,
  addToWishList,
  wishList,
  removeFromWishList,
  setWishList,
  users,
  reviews,
  createReview,
  setReviews,
  auth
}) => {
  const params = useParams();
  const productId = params.productId;
  const product = products.find((product) => product.id === productId);

  const isInWishList = () => {
    const item = wishList.find((wishListItem) => wishListItem.product_id === productId);
    return item !== undefined;
  };


  return (
    <div>
      {productId ? (
        <div>
          <h2>
            {product.name}
            {auth.id ? ( 
              <span>
                {isInWishList() ? (
                  <button onClick={() => removeFromWishList(product)}>
                    Remove from Wish List
                  </button>
                ) : (
                  <button onClick={() => addToWishList(product)}>
                    Add to Wish List
                  </button>
                )}
              </span>
            ) : null}
          </h2>
          <img src={`${product.image}`} alt={product.name} />
          <p>{product.type}</p>
          <p>Price: {product.price}</p>
          <p>Region: {product.location} </p>
          <p>ABV: {product.alcohol_percent}%</p>
          <p>Description: {product.description}</p>
          <ReviewsList reviews={reviews} />
          {auth.id && (
            <ReviewForm
              products={products}
              createReview={createReview}
              setReviews={setReviews}
            />
          )}
        </div>
      ) : (
        <div>Product not found.</div>
      )}
    </div>
  );
};


export default ProductDetail;
