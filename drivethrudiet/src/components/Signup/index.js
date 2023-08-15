import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function Signup() {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    birthday: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:7070/api/users/";
      const response = await axios.post(url, data, { withCredentials: true });
      navigate("/signup_profile");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="auth-form-container">
      <h2>Let's get started!</h2>
      <h5>All fields are required</h5>
      {error && <div className="error-message">❗️{error}</div>}
      <form className="form" id="signupForm" onSubmit={handleSubmit}>
        <label className="signup_label">
          <input
            className="signup_input"
            type="text"
            placeholder="First Name"
            id="firstNameInput"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
          />
        </label>

        <label className="signup_label">
          <input
            className="signup_input"
            type="text"
            placeholder="Last Name"
            id="lastNameInput"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
          />
        </label>

        <label className="signup_label">
          <input
            className="signup_input"
            type="email"
            placeholder="Email"
            id="emailInput"
            name="email"
            onChange={handleChange}
            value={data.email}
          />
        </label>

        <label className="signup_label">
          <input
            className="signup_input"
            type="date"
            placeholder=""
            id="birthdayInput"
            name="birthday"
            onChange={handleChange}
            value={data.birthday}
          />
        </label>

        <label className="signup_label">
          <input
            className="signup_input"
            type="password"
            placeholder="Password"
            id="passwordInput"
            name="password"
            onChange={handleChange}
            value={data.password}
          />
        </label>

        <button className="submit-btn" type="submit">
          SIGN UP
        </button>
      </form>
      <Link to="/login">
        <button className="link-btn">Already have an account? Log in.</button>
      </Link>
    </div>
  );
}
