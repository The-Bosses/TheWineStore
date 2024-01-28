import React from "react";
import { Link, useParams } from "react-router-dom";
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
  auth,
  updateLineItem,
  createLineItem,
  cartItems
}) => {
  const params = useParams();
  const productId = params.productId;
  const product = products.find((product) => product.id === productId);

  const cartItem = cartItems.find((lineItem) => lineItem.product_id === product.id);


  const isInWishList = () => {
    const item = wishList.find((wishListItem) => wishListItem.product_id === productId);
    return item !== undefined;
  };
  return (
    <div className="bg-red-100">
      <Link to="/products" className="hover-underline">
        <h3 className="text-red-900 m-3 text-lg underline"> {'<'} Back to all products</h3>
      </Link>
      <div className="max-w-2xl mx-auto mt-8 flex">
        {productId ? (
          <div>
            <div className="flex items-center mb-4">
              <img
                src={`${product.image}`}
                alt={product.name}
                className="m-4 bg-white w-80 h-80 rounded-lg object-contain shadow-md"
              />
              <div className="ml-4">
                <h2 className="text-4xl font-bold mb-2 text-red-900">{product.name}</h2>
                <p className="text-red-900 mb-2 text-lg">{product.type}</p>
                <p className="text-red-900 mb-2 text-lg">Price: ${product.price}</p>
                <p className="text-red-900 mb-2 text-lg">Region: {product.location} </p>
                <p className="text-red-900 mb-2 text-lg">ABV: {product.alcohol_percent}%</p>
                <p className="text-red-900 mb-2 text-base">Description: {product.description}</p>
                {auth.id ? (
                  <div>
                    <div>
                      {cartItem ? (
                        <button
                          className="w-full px-5 py-3 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm sm:text-base bg-red-800 text-red-50 hover:bg-red-900 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"
                          onClick={() => updateLineItem(cartItem)}
                        >
                          Add Another
                        </button>
                      ) : (
                        <button
                          className="w-full px-5 py-3 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm sm:text-base bg-red-800 text-red-50 hover:bg-red-900 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"
                          onClick={() => createLineItem(product)}
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
  
                    <span>
                      {isInWishList() ? (
                        <button
                          onClick={() => removeFromWishList(product)}
                          className="w-full px-5 py-3 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm sm:text-base bg-red-800 text-red-50 hover:bg-red-900 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"
                        >
                          Remove from Wish List
                        </button>
                      ) : (
                        <button
                          onClick={() => addToWishList(product)}
                          className="w-full px-5 py-3 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-offset-2 uppercase tracking-wider font-semibold text-sm sm:text-base bg-red-800 text-red-50 hover:bg-red-900 focus:ring-red-800 focus:ring-opacity-50 active:bg-red-800"
                        >
                          Add to Wish List
                        </button>
                      )}
                    </span>
                  </div>
                ) : 
                <strong><h3 className="text-red-900">Please sign up or create an account to add the product to your cart.</h3></strong>
                }
              </div>
            </div>
  
            <ReviewsList reviews={reviews} productName={product.name} auth={auth} setReviews={setReviews} createReview={createReview} products={products}/>
           
          </div>
        ) : (
          <div>Product not found.</div>
        )}
      </div>
    </div>
  );
};


export default ProductDetail;
