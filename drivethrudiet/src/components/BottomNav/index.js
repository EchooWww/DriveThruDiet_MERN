import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const navLinks = [
  { name: "Home", link: "/home", file: "icon-home" },
  { name: "Menu", link: "/restaurant", file: "icon-menu" },
  { name: "Chat", link: "/chat", file: "icon-chatbot" },
];

const BottomNav = () => {
  const [currentURL, setCurrentURL] = useState(window.location.pathname);
  // Update the currentURL whenever the route changes
  const handleRouteChange = (link) => {
    setCurrentURL(link);
  };

  // Attach the route change event listener when the component mounts
  return (
    <div id="bottom-nav-container">
      {navLinks.map((navLink, index) => (
        <div key={index}>
          <Link
            to={navLink.link}
            onClick={() => handleRouteChange(navLink.link)}
          >
            <img
              src={require(`/src/img/${navLink.file}${
                navLink.link !== currentURL ? "-inactive" : ""
              }.png`)}
              alt={navLink.name}
              className="bottom-nav-icons"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BottomNav;
