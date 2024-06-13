import React from "react";
import classes from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import Button from "../../Componenets/Button/Button";
import { useDispatch, useSelector } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {};
  return (
    <div>

      <>
        <logo />
      </>



           <>
      <ul className={classes.navList}>
        <li className="navItem">
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li className="navItem">
          <NavLink to="/Groups">Treatment Plans</NavLink>
        </li>
      </ul>
      <div className={classes.logout}>
        <Button name="Logout" style="style2" onClick={logoutHandler} />
      </div>
    </>


    <>
    {/* username  */}
    {/* logout button */}
    </>
    </div>


   
  );
};

export default Navigation;
