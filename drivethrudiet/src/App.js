import { Routes, Route, Navigate } from "react-router-dom";
import "./style.css";
import LandingPage from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";
import SignupProfile from "./components/SignupProfile";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/signup_profile" exact element={<SignupProfile />} />
    </Routes>
  );
}

export default App;
