import React, {useState} from "react";

const UserProfile = ({ user }) => {

  return (
    <div>

        <h2>Welcome {user.name} </h2>
        <h3>Your Account Details:</h3>
          <ul>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>Address: {user.address_1}, {user.city}, {user.state} {user.postal_code}</li>
         </ul>
    </div>
  );
};

export default UserProfile;
