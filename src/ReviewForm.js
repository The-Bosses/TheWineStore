import React, { useState } from "react"



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
           
        setItem('');
        setUser('');
        setRating('');
        setComment('');
        
    };
    
    return(
        <div className="">
            
            <form onSubmit={handleCreateReview}>
                <h4>Leave a Review</h4>
                <label>Product Name</label>
                <select className="hover:bg-red-200" value={item} onChange={(event)=>{setItem(event.target.value)}}>
                    <option>Choose Wine Name</option>
                    {products.map((product)=>{
                        return(<option key={product.id} 
                            value={product.name}>{product.name}
                            </option>)
                    })}
                </select>
                
                <label>Username</label>
                <input
                    type="text"
                    value={user}
                    onChange={(event)=> {setUser(event.target.value)}}
                    className="hover:bg-red-200"
                    />
                <label>Rating</label>
                <input 
                        type="number"
                        value={rating}
                        onChange={(event)=>{setRating(event.target.value)}}
                        className="hover:bg-red-200"
                />
                <label>Comment</label>
                    <input 
                        type="text"
                        value={comment}
                        onChange={(event)=> {setComment(event.target.value)}}
                        className="hover:bg-red-200"
                />
            {
                    comment ? <button 
                    className="px-4 py-2 rounded-md ml-2" 
                    type="sumbit">Submit Review!</button> : null
            }
                
            </form>
           
        </div>
    )
}

export default ReviewForm;