
import React, { useState, useEffect } from "react";
import api from "./api";

const UserProfile = ({ user: initialUser }) => {
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isVIP, setIsVIP] = useState(false);
  const [user, setUser] = useState(initialUser);

  useEffect (() => {
    setUser(initialUser)
  }, [initialUser])

  useEffect (() => {
    setIsVIP(user.is_vip === true);
  }, [user.is_vip])


  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async (user) => {
    const editedUser = {...user, username, email}
    console.log(user)
    await api.editUsers({editedUser, setUser});

  }

  const handleCancelClick = () => {
    setEditMode(false);
    setUsername(user.username);
    setEmail(user.email);
  };

  return (
    <div>
      <h2>Welcome {user.name} {isVIP && "(VIP)"}</h2>
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
                onChange={(event) => {setUsername(event.target.value)}}
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
                onChange={(event) => {setEmail(event.target.value)}}
              />
            </label>
            <br />
            <button type="button" onClick={() => handleSaveClick(user) }>
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
        </>
      )}

    </div>
  );
};

export default UserProfile;
