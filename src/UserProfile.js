import React, {useState} from "react";

const UserProfile = ({ user }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({...user});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUser((prevUser) => ({...prevUser, [name]: value}));

  };

  const handleEditClick = () => {
    setEditMode(true);
  };

const handleSaveClick = () => {
  console.log("Saving changes:", editedUser);
  setEditMode(false);
}

  return (
    <div>

        <h2>Welcome {user.name} </h2>
        {editMode ? (
        <>
          <h3>Edit Your Information:</h3>
          <form>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="button" onClick={handleSaveClick}>
              Save Changes
            </button>
          </form>
        </>
      ) : (
        <>
        <h3>Your Account Details:</h3>
          <ul>
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>Address: {user.address_1}, {user.city}, {user.state} {user.postal_code}</li>
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
