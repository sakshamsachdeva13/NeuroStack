import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";

import Login from "./pages/Login/login";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import ResetSuccess from "./pages/ResetSuccess/ResetSuccess";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from './pages/Dashboard/Dashboard';
import SearchUser from "./pages/user/user";
import CreateUser from "./pages/CreateUser/createUser";
import Page404 from './pages/page404/page404';
import TreatmentPlanner from './pages/TreatmentPlanner/TreatmentPlanner';

import classes from "./App.module.css";

function App() {
  const isAuthenticated = false; // false for login page
  const userType = 'user'; // admin for admin flow

  const AuthApp = (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/reset-password" exact element={<ResetPassword />} />
      <Route path="/reset-success" exact element={<ResetSuccess />} />
      <Route element={<Page404 />} />
    </Routes>
  );

  const defaultApp = (
    <>
      <Navigation userType={userType} />
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/planner" exact element={<TreatmentPlanner />} />
        <Route path="/reset-password" exact element={<ResetPassword />} />
        <Route path="/reset-success" exact element={<ResetSuccess />} />
        <Route element={<Page404 />} />
      </Routes>
    </>
  );

  const adminApp = (
    <>
      <Navigation userType={userType} />
      <Routes>
        <Route path='/login' exact element={<Login />} />
        <Route path='/' exact element={<SearchUser />} />
        <Route path='/createUser' element={<CreateUser />} />
        <Route path="/reset-password" exact element={<ResetPassword />} />
        <Route path="/reset-success" exact element={<ResetSuccess />} />
        <Route element={<Page404 />} />
      </Routes>
    </>
  );

  const renderApp = isAuthenticated ? (userType === 'admin' ? adminApp : defaultApp) : AuthApp;
  return <Container maxWidth={false} disableGutters>{renderApp}</Container>;
}

export default App;
