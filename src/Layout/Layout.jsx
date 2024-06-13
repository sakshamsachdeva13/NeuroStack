import React from "react";
import { classes } from "./Layout.module.css";
import Navigation from "../components/Navigation/Navigation";
const Layout = (children) => {
  return (
    <div>
      <Navigation />
      {/* {children} */}
    </div>
  );
};

export default Layout;
