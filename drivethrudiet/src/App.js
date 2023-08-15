import { Routes, Route, Navigate } from "react-router-dom";
import "./style.css";
import LandingPage from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SignupProfile from "./components/SignupProfile";
import OnboardingGoal from "./components/OnboardingGoal";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/signup_profile" exact element={<SignupProfile />} />
      <Route path="/onboarding_goal" exact element={<OnboardingGoal />} />
      <Route path="/home" exact element={<Home />} />
    </Routes>
  );
}

export default App;
