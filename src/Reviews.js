import React from "react";


const ReviewsList = ({review, reviews,products}) => {
  //const params = useParams();
  //const productId = params.productId;
  //const product = products.find((product) => {
    //return productname === productId
  //})
   
    return (
        <div className="text-red-300">
            <h4>Reviews</h4> 
            <ul>
                {
                reviews.map((review) => {
                    return (
                        <li key={review.id}>
                             {review.product_id} - 
                            User: {review.user_id} - 
                            Rating: {review.rating} - 
                            Comment: {review.comment} - 
                            
                        </li>
                    )
                })
                
                }
                </ul>
                
        </div>
        
    ); 
}; 
export default ReviewsList;