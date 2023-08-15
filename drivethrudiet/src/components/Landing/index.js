import { Link } from "react-router-dom";
import Logo from "../../img/Logo-white.png";
export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="container">
        <div className="image-container">
          <img src={Logo} alt="logo" id="logo" />
        </div>
        <Link to="/login">
          {" "}
          <button className="access-btn">ACCESS</button>
        </Link>
      </div>
    </div>
  );
}
