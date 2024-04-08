import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/authContext.jsx";

function Login() {
  const [err, setError] = useState("");
  const [IsLoading, setIsLoading] = useState(false);

  const { updateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      // setError("");
      // localStorage.setItem("user", JSON.stringify(res.data));
      updateUser(res.data);
      navigate("/");
    } catch (error) {
      setError({message:"Failed to login!"});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleLogin}>
          <h1>Welcome back</h1>
          <input name="username" required minLength={3} maxLength={20} type="text" placeholder="Username" />
          <input name="password" required type="password" placeholder="Password" />
          <button disabled={IsLoading}>Login</button>
          {err && <span>{err.message}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
