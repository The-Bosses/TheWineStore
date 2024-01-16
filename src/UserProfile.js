import React, {useState} from "react";

const UserProfile = ({ user }) => {
  console.log(user)
  const [error, setError] = useState(null);

  if (!user.id) {
    setError("Please log in to view your profile.")
    return <div>{error}</div>;
  }

  return (
    <div>

        <h2>Welcome {user.name} </h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      
    </div>
  );
};

export default UserProfile;
