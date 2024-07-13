import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Login from "./pages/Login/login";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./pages/Dashboard/Dashboard";
import SearchUser from "./pages/user/user";
import CreateUser from "./pages/CreateUser/createUser";
import Page404 from "./pages/page404/page404";
import TreatmentPlanner from "./pages/TreatmentPlanner/TreatmentPlanner";

import { Toaster } from "react-hot-toast"; // Importing Toaster from react-hot-toast

import classes from "./App.module.css";

function App() {
  let userDetails = sessionStorage.getItem("user");
  const user = userDetails ? JSON.parse(userDetails) : null;

  const userType = "admin";
  const AuthApp = (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route element={<Page404 />} />
    </Routes>
  );

  const defaultApp = (
    <>
      <Navigation userType={userType} />
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/planner" exact element={<TreatmentPlanner />} />
        <Route element={<Page404 />} />
      </Routes>
    </>
  );

  const adminApp = (
    <>
      <Navigation userType={userType} />
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/" exact element={<SearchUser />} />
        <Route path="/createUser" element={<CreateUser />} />
      </Routes>
    </>
  );

  const renderApp = user
    ? userType === "admin"
      ? adminApp
      : defaultApp
    : AuthApp;

  return (
    <Container maxWidth={false} disableGutters>
      <div>
        <Toaster /> {/* Rendering Toaster from react-hot-toast */}
      </div>
      {renderApp}
    </Container>
  );
}

export default App;
