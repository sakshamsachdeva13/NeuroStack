import React, { useState } from "react";
import classes from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import Button from "../Button/Button.jsx";
import logo from "../../Assets/NeuroStack-1.png"; // Corrected path to logo


const Navigation = () => {
  // State to manage visibility of logout button dropdown
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const toggleLogoutDropdown = () => {
    setIsLogoutOpen(!isLogoutOpen);
  };

  const logoutHandler = () => {
    // Here you can add your logout logic, such as clearing session/local storage, redirecting to login page, etc.
    // For example:
    console.log("User logged out!");
    // Clear session/local storage
    localStorage.removeItem("user");
    // Redirect to login page
    window.location.href = "/login"; // Uncomment this line to redirect
  };

  return (
    <div className={classes.navContainer}>
      {/* Left side logo */}
      <div className={classes.logoContainer}>
        <img src={logo} alt="Logo" style={{ height: '83px', width: '105px' }} />
      </div>

      {/* Middle navigation links */}
      <ul className={classes.navList}>
        <li className={classes.navItem}>
          <NavLink to="/" className={({ isActive }) => (isActive ? classes.activeNavLink : classes.navLink)}>
            Dashboard
          </NavLink>
        </li>
        <li className={classes.navItem}>
          <NavLink to="/Groups" className={({ isActive }) => (isActive ? classes.activeNavLink : classes.navLink)}>
            Treatment Plans
          </NavLink>
        </li>
      </ul>

      {/* Right side user information */}
      <div className={classes.userContainer}>
        <div className={classes.username}>Username</div>
        <div className={classes.dropdownContainer}>
          <div className={classes.carrot} onClick={toggleLogoutDropdown}>
            &#9662; {/* Down arrow icon */}
          </div>
          {isLogoutOpen && (
            <div className={classes.logoutDropdown}>
              <Button name="Logout" style="style2" onClick={logoutHandler} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
