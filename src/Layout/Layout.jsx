import React from "react";
import { classes } from "./Layout.module.css";
import Navigation from "../components/Navigation/Navigation";
const Layout = ({children}) => {
  return (
    <div className={classes.container}>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
