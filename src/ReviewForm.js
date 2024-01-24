import React, { useState } from "react"
import api from "./api"


const ReviewForm = ({products, reviews, createReview}) => {

    const [item,setItem] = useState('')
    const [user, setUser] = useState('')
    const [rating,setRating] = useState('')
    const [comment, setComment] = useState('')
    

      
    const handleCreateReview = async (event) => {
       event.preventDefault()
       const review = {
            product_id: item,
            user_id: user,
            rating: rating,
            comment: comment
        };
        console.log(review)
        createReview(review)
        
        //const updatedReviews = await api.fetchReviews();
        //setReviews(updatedReviews);
        
        setItem('');
        setUser('');
        setRating('');
        setComment('');
        
    };
    
    return(
        <div>
            
            <form onSubmit={handleCreateReview}>
                <h4>Leave a Review</h4>
                <label>Product Name</label>
                <select value={item} onChange={(event)=>{setItem(event.target.value)}}>
                    <option>Choose Wine Name</option>
                    {products.map((product)=>{
                        return(<option key={product.id} value={product.name}>{product.name}</option>)
                    })}
                </select>
                
                <label>Username</label>
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
                        value={comment}
                        onChange={(event)=> {setComment(event.target.value)}}
                />
            {
                    comment ? <button type="sumbit">Submit Review!</button> : null
            }
                
            </form>
           
        </div>
    )
}

export default ReviewForm;