import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import { removeFromWishList } from "./api";
import axios from "axios";

const UserProfile = ({ user: initialUser, setUserData, wishList, product, products, removeFromWishList }) => {
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

  const handleRemoveFromWishList = (product_id) => {
    removeFromWishList(product_id);
    console.log(product_id)
  };



  return (
    <div className="text-center flex-1 bg-gray-400 object-center">
      <h2 className="text-3xl font-bold mb-4 text-white">
        Welcome {user.name} {isVIP && "(VIP)"}
      </h2>
      {editMode ? (
        <>
          <h3>Edit Your Information:</h3>
          <div>
          <form className=""> 
            <label className="space-y-8">
              Username:
              <input className="bg-gray-400 outline space-y-8"
                type="text"
                name="username"
                placeholder={user.username}
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </label>
            <br />
            <label>
              Email:
              <input className="bg-gray-400 outline space-y-8"
                type="email"
                name="email"
                placeholder={user.email}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </label>
            <br />
            <button className="bg-gray-950 text-white px-4 py-2 rounded-md ml-2 space-y-8" type="button" onClick={() => handleSaveClick(user)}>
              Save Changes
            </button>
            <button className="bg-gray-950 text-white px-4 py-2 rounded-md ml-2"type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </form>
          </div>
          <br/>
          <div className="w-1/2 p-4">
          <img className=""
            src="https://hips.hearstapps.com/hmg-prod/images/vineyards-in-napa-valley-california-royalty-free-image-1693237218.jpg?resize=2048:*" 
            alt="wine glasses" 
            width={900} 
            height={500}
          />
          </div>
        </>
     ) : (
      <>
        
        <h3 className="text-3xl bg-cover bg-denter">Your Account Details:</h3>
        <ul className="content-between inset-x-0">
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>
            Address: {user.address_1}, {user.city}, {user.state}{" "}
            {user.postal_code}
          </li>
          {isVIP && <li>Status: VIP User</li>}
        </ul>
        <button className="bg-gray-950 text-white px-4 py-2 rounded-md ml-2" type="button" onClick={handleEditClick}>
          Edit Profile
        </button>
        <br/>
        {wishList.length > 0 && (
          <>
            <h3 className="text-2xl">Your Wish List: {wishList.length}</h3>
            <ul>
              {wishList.map((wishListItem) => {
                const productDetails = returnUserWishList(wishListItem.product_id)[0];

                return (
                  <li key={wishListItem.product_id}>
                    {productDetails && (
                       <>
                       <Link to={`/product/${wishListItem.product_id}`}>
                         <strong>{productDetails.name}</strong>
                       </Link>
                       <button className="bg-gray-300 hover:bg-gray-200 px-4 py-2 rounded-md ml-2" 
                        onClick={(wishListItem_id) => handleRemoveFromWishList(wishListItem_id)}
                        >Remove From Wishlist</button>
                     </>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgfGZr-MFFh5WBM19K-FirCS-naRPkKDpnTw&usqp=CAU" 
        alt="wine glasses" 
        width={400} 
        height={400}
        />

      </>
    )}
  </div>
);
};

export default UserProfile;
