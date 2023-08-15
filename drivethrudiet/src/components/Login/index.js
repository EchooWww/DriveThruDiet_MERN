import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Logging in");
      const url = "http://localhost:7070/api/auth";
      const { data: res } = await axios.post(url, data, {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data);
      Navigate("/home");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="auth-form-container">
      <h2>LOGIN</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="input-box">
          <input
            type="text"
            placeholder="email"
            id="emailInput"
            name="email"
            required
            onChange={handleChange}
            value={data.email}
          />
        </label>

        <label className="input-box">
          <input
            type="password"
            placeholder="Password"
            id="passwordInput"
            name="password"
            onChange={handleChange}
            value={data.password}
          />
        </label>

        <button className="submit-btn" type="submit">
          LOGIN
        </button>
      </form>
      <Link to="/signup">
        <button className="link-btn">
          Don't have an account? Register here.
        </button>
      </Link>
    </div>
  );
}
export default Login;
