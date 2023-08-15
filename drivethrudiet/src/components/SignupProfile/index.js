import "./signup_profile.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function SignupProfile() {
  const [data, setData] = useState({
    sex: "",
    height: "",
    weight: "",
    activity: "",
    goal: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    setData({ ...data, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:7070/api/users/signup_profile";
      const response = await axios.post(url, data, { withCredentials: true });
      navigate("/onboarding_goal");
    } catch (error) {
      console.log(error.message);
      if (error.response && (error.response.status === 400 || 409)) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="auth-form-container">
      <h2>Set Nutritional Goal</h2>
      <h5>All fields are required</h5>
      {error && <div className="error-message">❗️{error}</div>}

      <form
        id="profile-form"
        method="post"
        action="/onboarding_goal"
        className="form"
        onSubmit={handleSubmit}
      >
        <div id="sex">
          Sex:
          <label>
            <input
              className="profile_input"
              type="radio"
              name="sex"
              value="female"
              style={{ display: "inline" }}
              required
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              className="profile_input"
              type="radio"
              name="sex"
              value="male"
              style={{ display: "inline" }}
              required
              onChange={handleChange}
            />
            Male
          </label>
        </div>
        <br />
        <input
          className="profile_input"
          type="number"
          id="height"
          name="height"
          placeholder="Height (in cm)"
          min="0"
          required
          onChange={handleChange}
        />
        <input
          className="profile_input"
          type="number"
          id="weight"
          name="weight"
          placeholder="Weight (in kg)"
          min="0"
          required
          onChange={handleChange}
        />
        <label className="select_label">
          <select
            className="questionIndex"
            id="activity"
            name="activity"
            required
            onChange={handleChange}
            value={data.activity}
          >
            <option value="" disabled hidden>
              Choose activity level
            </option>
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="lightly-active">
              Lightly active (light exercise/sports 1-3 days/week)
            </option>
            <option value="moderately-active">
              Moderately active (moderate exercise/sports 3-5 days/week)
            </option>
            <option value="very-active">
              Very active (hard exercise/sports 6-7 days a week)
            </option>
            <option value="super-active">
              Super active (very hard exercise/sports, physical job or training)
            </option>
          </select>
        </label>
        <label className="select_label">
          <select
            className="questionIndex"
            id="goal"
            name="goal"
            required
            value={data.goal}
            onChange={handleChange} // Set the selected option using the value prop
          >
            <option value="" disabled hidden>
              Choose goal
            </option>
            <option value="lose-weight">Lose weight</option>
            <option value="maintain-weight">Maintain weight</option>
            <option value="gain-muscle">Gain muscle</option>
          </select>
        </label>
        <button type="submit" id="calculate-btn" className="submit-btn">
          CALCULATE
        </button>
      </form>
    </div>
  );
}
