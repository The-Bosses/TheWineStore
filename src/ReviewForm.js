import React, { useState } from "react"
import api from "./api"


const ReviewForm = ({createReview}) => {
    const [item,setItem] = useState()
    const [user, setUser] = useState('')
    const [rating,setRating] = useState('')
    const [reviews, setReviews] = useState('')
    

      //console.log(reviews)
    const handleCreateReview = async (event) => {
        event.preventDefault()
       
        
        await api.createReview({
            product_id: item,
            user_id: user,
            rating: rating,
            comment: reviews
        });
        
        const updatedReviews = await api.fetchReviews();
        setReviews(updatedReviews);
        

        setItem('');
        setUser('');
        setRating('');
        setReviews('');
        
    };
    
    return(
        <div>
            
            <form>
                <h4>Leave a Review</h4>
                <label>Product_id</label>
                <input
                    type="text"
                    value={item}
                    onChange={(event)=>{setItem(event.target.value)}}
                    />
                    <label>user_id</label>
                <input
                    type="text"
                    value={user}
                    onChange={(event)=> {setUser(event.target.value)}}
                    />
                <label>Rating</label>
                    <input 
                        type="number"
                        value={rating}
                        onChange={(event)=>{setRating(event.target.value)}}
                    />
                <label>Comment</label>
                    <input 
                        type="text"
                        vlaue={reviews}
                        onChange={(event)=> {setReviews(event.target.value)}}
                    />
                {
                    reviews ? <button onClick={handleCreateReview}>Submit Review!</button> : null
                }
                
            </form>

        </div>
    )
}

export default ReviewForm