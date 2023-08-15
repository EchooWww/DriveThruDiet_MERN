import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function OnboardingGoal() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:7070/api/users/onboarding", {
        withCredentials: true, // Include cookies in the request
      })
      .then((response) => {
        setData(response.data);
      });
  }, []);

  return (
    <div className="auth-form-container">
      <h2>My Nutritional Goals</h2>
      <div className="profile-card">
        <div className="item item--1">
          Calorie
          <span className="quantity">{data.calorieGoal}</span>
          <span className="text text--1"> Calories </span>
        </div>
        <div className="item item--2">
          Carbohydrate <span className="quantity">{data.carbGoal}</span>
          <span className="text text--2"> Grams </span>
        </div>
        <div className="item item--3">
          Protein <span className="quantity">{data.proteinGoal}</span>
          <span className="text text--3"> Grams </span>
        </div>
        <div className="item item--4">
          Fat
          <span className="quantity">{data.fatGoal}</span>
          <span className="text text--4"> Grams </span>
        </div>
      </div>
      <Link to="/home">
        <button className="submit-btn">Start My Journey</button>
      </Link>
    </div>
  );
}
