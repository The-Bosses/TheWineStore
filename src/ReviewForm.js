import React, { useState } from "react"

const ReviewForm = ({products, createReview, productName}) => {

    const [item,setItem] = useState('')
    const [user, setUser] = useState('')
    const [rating,setRating] = useState('')
    const [comment, setComment] = useState('')

    const findProduct = () => {
       const thisProduct = products.filter((product) => {
            return product.name === productName
        })
        return thisProduct[0];
    }
    
    const pageProduct = findProduct()

    const handleCreateReview = async (event) => {
       event.preventDefault()
       const review = {
            product_id: item,
            user_id: user,
            rating: rating,
            comment: comment
        };
        createReview(review)
           
        setItem('');
        setUser('');
        setRating('');
        setComment('');
        
    };
    
    return (
        <div className="max-w-md mx-auto p-4">
            <form onSubmit={handleCreateReview} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h4 className="text-xl font-bold mb-4 text-red-950">Leave a Review</h4>
    
                <div className="mb-4">
                    <label className="block text-red-900 text-sm font-bold mb-2">Product Name</label>
                    <select
                        value={item}
                        onChange={(event) => { setItem(event.target.value) }}
                        className="w-full p-2 border rounded"
                    >
                        <option>Choose Wine Name</option>
                        <option
                            key={pageProduct.id} value={pageProduct.name}>{pageProduct.name}
                        </option>
                    </select>
                </div>
    
                <div className="mb-4">
                    <label className="block text-red-900 text-sm font-bold mb-2">Name</label>
                    <input
                        type="text"
                        value={user}
                        onChange={(event) => { setUser(event.target.value) }}
                        className="w-full p-2 border rounded"
                    />
                </div>
    
                <div className="mb-4">
                    <label className="block text-red-900 text-sm font-bold mb-2" htmlFor="rating">Rating: Worst 0-5 Best</label>
                    <input
                        type="number"
                        id="rating"
                        value={rating}
                        onChange={(event) => { setRating(event.target.value) }}
                        className="w-full p-2 border rounded"
                    />
                </div>
    
                <div className="mb-4">
                    <label className="block text-red-900 text-sm font-bold mb-2">Comment</label>
                    <input
                        type="text"
                        value={comment}
                        onChange={(event) => { setComment(event.target.value) }}
                        className="w-full p-2 border rounded"
                    />
                </div>
    
                {comment &&
                    <button type="submit" className="bg-red-800 hover:bg-red-900 text-white py-2 px-4 rounded cursor-pointer">
                        Submit Review!
                    </button>
                }
            </form>
        </div>
    );
}

export default ReviewForm;