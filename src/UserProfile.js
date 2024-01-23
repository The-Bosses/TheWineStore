import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./api";
import { removeFromWishList } from "./api";
import axios from "axios";

const UserProfile = ({ user: initialUser, setUserData, wishList, products, removeFromWishList }) => {
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

  const handleRemoveFromWishList = (productId) => {
    removeFromWishList(productId);
  };



  return (
    <div>
      <h2>
        Welcome {user.name} {isVIP && "(VIP)"}
      </h2>
      {editMode ? (
        <>
          <h3>Edit Your Information:</h3>
          <form>
            <label>
              Username:
              <input
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
              <input
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
            <button type="button" onClick={() => handleSaveClick(user)}>
              Save Changes
            </button>
            <button type="button" onClick={handleCancelClick}>
              Cancel
            </button>
          </form>
        </>
     ) : (
      <>
        <h3>Your Account Details:</h3>
        <ul>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>
            Address: {user.address_1}, {user.city}, {user.state}{" "}
            {user.postal_code}
          </li>
          {isVIP && <li>Status: VIP User</li>}
        </ul>
        <button type="button" onClick={handleEditClick}>
          Edit Profile
        </button>
        {wishList.length > 0 && (
          <>
            <h3>Your Wish List: {wishList.length}</h3>
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
                     </>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </>
    )}
  </div>
);
};

export default UserProfile;
