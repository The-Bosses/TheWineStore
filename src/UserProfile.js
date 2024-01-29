import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api";

const UserProfile = ({ 
  user: initialUser,  
  wishList,  
  products, 
  removeFromWishList 
}) => {

  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isVIP, setIsVIP] = useState(false);
  const [user, setUser] = useState(initialUser);


  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    setIsVIP(user.is_vip === true);
  }, [user.is_vip]);


  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async (user) => {
    const editedUser = { 
    ...user, 
    username: username !== "" ? username : user.username, 
    email: email !== "" ? email : user.email
  };
    await api.editUsers({ editedUser, setUser });
    window.location.reload();
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setUsername(user.username);
    setEmail(user.email);
  };

  const returnUserWishList = (wishListItem_id) => {
     const myWishListItem = products.filter((product) => {
        return product.id === wishListItem_id;
      });
      return myWishListItem;
  }

  const handleRemoveFromWishList = (productDetails) => {
    removeFromWishList(productDetails);
  };



  return (
    <div className="text-center flex-1 object-center">
      <h2 className="text-3xl font-bold mb-4 text-red-500">
        Welcome {user.name} {isVIP && "(VIP)"}
      </h2>
      {editMode ? (
        <>
          <div>
          <h3 className="text-xl font-bold mb-4">Edit Your Information:</h3>
          <form className="mb-4"> 
            <div className="mb-4">
              <label className="space-y-8">
                Username:
                <input className="m-4 hover:bg-gray-400 outline space-y-8 rounded-sm"
                  type="text"
                  name="username"
                  placeholder={user.username}
                  value={username}
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
              </label>
            </div>
            
            <div className="mb-4 m-2">
              <label>
                Email:
                <input className="m-2 hover:bg-gray-400 outline space-y-8 rounded-sm"
                  type="email"
                  name="email"
                  placeholder={user.email}
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </label>
            </div>
            <br />
            <button className="bg-gray-300 text-black hover:bg-black hover:text-white px-4 py-2 rounded-md ml-2 space-y-8" type="button" onClick={() => handleSaveClick(user)}>
              Save Changes
            </button>
            <button className="bg-gray-300 text-black hover:bg-black hover:text-white px-4 py-2 rounded-md ml-2"type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </form>
            <div className="flex justify-center">
              <img
                src="https://hips.hearstapps.com/hmg-prod/images/vineyards-in-napa-valley-california-royalty-free-image-1693237218.jpg?resize=2048:*" 
                alt="vineyard" 
                width={900} 
                height={300}
              />
            </div>
          </div>
          <br/>
        </>
     ) : (
      <>
      <h3 className="text-3xl bg-cover bg-center mb-8">Your Account Details:</h3>
      <div className="flex">
        
          <div className="h-full p-4 text-center flex-shrink w-1/2 mb-8">
            <h3 className="text-4xl font-bold text-center mb-4">your Information</h3>
            <ul className="content-between inset-x-0 mb-8 text-2xl font-bold">
              <li>Username: {user.username}</li>
              <li>Email:    {user.email}   </li>
              <li>
                Address: {user.address_1}, {user.city}, {user.state}{" "}
                {user.postal_code}
              </li>
              {isVIP && <li>Status: VIP User</li>}
            </ul>
            <button className="bg-gray-300 text-black hover:bg-black hover:text-white px-4 py-2 rounded-md ml-2 mb-4" type="button" onClick={handleEditClick}>
              Edit Profile
            </button>
          </div>
          <br/>
          {wishList.length > 0 && (
          <>
          <div className="mb-4 p-4 flex-shrink w-1/2 text-right">
            <h3 className="text-4xl font-bold text-center mb-4">Your Wish List: {wishList.length}</h3>
            <ul className="text-red-800 mb-4">
              {wishList.map((wishListItem) => {
                const productDetails = returnUserWishList(wishListItem.product_id)[0];

                return (
                  <li className="mb-4" key={wishListItem.product_id}>
                    {productDetails && (
                       <>
                       <Link to={`/product/${wishListItem.product_id}`}>
                         <strong className="text-2xl">{productDetails.name}</strong>
                       </Link>
                       <button className="bg-gray-300 text-gray-950 hover:bg-gray-950 hover:text-white px-4 py-2 rounded-md ml-2" 
                        onClick={() => handleRemoveFromWishList(productDetails)}
                        >Remove From Wishlist</button>
                     </>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          </>
          )} 
      </div>
      </>
    )}
  </div>
);
};

export default UserProfile;
