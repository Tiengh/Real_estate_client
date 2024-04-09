import { useContext, useState } from "react";
import "./profileUpdatePage.scss";
import { AuthContext } from "../../context/authContext.jsx";
import apiRequest from "../../lib/apiRequest.js";
import { Link, useNavigate } from "react-router-dom";

function ProfileUpdatePage() {
  const [error, setError] = useState("");

  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);
    
    try {
      const res = await apiRequest.put(`/users/${currentUser.id}`, {
        username,
        email,
        password,
      });
      updateUser(res.data);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      setError({ message: "Failed to update!" });
    }
  };
  return (
    <div className="profileUpdatePage">
      <div className="formContainer">
        <form onSubmit={handleUpdate}>
          <h1>Update Profile</h1>
          <div className="item">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              defaultValue={currentUser.username}
            />
          </div>
          <div className="item">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
            />
          </div>
          <div className="item">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" />
          </div>
          <button>Update</button>
          {error && <span>{error.message}</span>}
        </form>
      </div>
      <div className="sideContainer">
        <img
          src={currentUser.avatar || "/noavatar.jpg"}
          alt=""
          className="avatar"
        />
      </div>
    </div>
  );
}

export default ProfileUpdatePage;
