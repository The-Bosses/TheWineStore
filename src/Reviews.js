import React from "react";
import { Link, createPath } from "react-router-dom";
import { useState } from "react";
import ReviewForm from "./ReviewForm";


const ReviewsList = ({review, reviews,products, productName, auth, setReviews, createReview}) => {
    const [wantToReview, setWantToReview] = useState(false)
    const findReviews = () => {
        const productReviews = reviews.filter((review) => {
            return review.product_id === productName
        })
        return productReviews
    }
    const reviewsLength = findReviews().length
    
    const handleClick = (event) => {
        event.preventDefault()
        setWantToReview(!wantToReview)
    }
    return (
        <div className="border bg-white p-4 rounded-md shadow-md max-w-md mx-auto mt-8 mb-8">
          <h4 className="text-lg text-red-900 font-semibold pb-2 border-b">Reviews ({reviewsLength})</h4>
          <ul className="list-none p-0">
            {reviewsLength > 0 ? (
              findReviews().map((review) => (
                <li key={review.id} className="mb-4 pb-2 border-b">
                  <p className="mb-1 text-red-900">User: {review.user_id}</p>
                  <p className="mb-1 text-red-900"><strong> Rating: {review.rating} </strong></p>
                  <p className="text-red-900">{review.comment}</p>
                </li>
              ))
            ) : null}
            {auth.id ? (
              reviewsLength > 0 ? (
                <p className="mt-2 text-red-900">
                  Want to leave a review? <u className="cursor-pointer hover:underline" onClick={(event) => {handleClick(event)}} >Click here!</u> 
                </p>
              ) : (
                <div>
                    <p className="mt-2 text-red-900">No reviews. Please leave a review!</p>
                    <p className="mt-2 text-red-900">
                         Want to leave a review? <u className="cursor-pointer hover:underline" onClick={(event) => {handleClick(event)}} >Click here!</u> 
                    </p>
                </div>
                
              )
            ) : (
              reviewsLength > 0 ? null : (
                <p className="mt-2 text-red-900">
                  No reviews. Please sign up or login to leave a review!
                </p>
              )
            )}
          </ul>
          { wantToReview && (
            <ReviewForm
            products={products}
            createReview={createReview}
            setReviews={setReviews}
            productName={productName}
            
          />
          )}
        </div>
      );
}; 
export default ReviewsList;