// import "./App.css";
import Login from "./pages/Login/login";
import Navigation from "./components/Navigation/Navigation";
// import Layout from './components/Layout/Layout';
import Dashboard from "./pages/Dashboard/Dashboard";
import SearchUser from "./pages/user/user";
import CreateUser from "./pages/CreateUser/createUser";
import Page404 from "./pages/page404/page404";
import TreatmentPlanner from "./pages/TreatmentPlanner/TreatmentPlanner";
import toast, { Toaster } from "react-hot-toast";
import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Grid } from "@mui/material";
function App() {
  const user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null;

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
        <Toaster />
      </div>
      {renderApp}
    </Container>
  );
}

export default App;
