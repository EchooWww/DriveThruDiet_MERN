import { Routes, Route, Navigate } from "react-router-dom";
import "./style.css";
import LandingPage from "./components/Landing";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
  const user = localStorage.getItem("token");
  return (
    <Routes>
      <Route path="/" exact element={<LandingPage />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/signup" exact element={<Signup />} />
    </Routes>
  );
}

export default App;
