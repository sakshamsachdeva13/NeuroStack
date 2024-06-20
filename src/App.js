// import "./App.css";
import Login from "./pages/Login/login";
import Navigation from "./components/Navigation/Navigation";
// import Layout from './components/Layout/Layout';
// import Dashboard from './pages/Dashboard/Dashboard';
import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import TreatmentPlanner from "./pages/TreatmentPlanner/TreatmentPlanner";
import Page404 from "./pages/page404/page404";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  const isAuthenticated = false;

  const AuthApp = (
    <>
      <Navigation />
      <Dashboard />
      <Routes>
        {/* <Route path="/" exact element={<Login />} /> */}
        <Route element={<Page404 />} />
      </Routes>
    </>
  );

  const defaultApp = (
    <>
      <Navigation />
      <Dashboard />
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/planner" exact element={<TreatmentPlanner />} />
        <Route element={<Page404 />} />
      </Routes>
    </>
  );

  const renderApp = isAuthenticated ? defaultApp : AuthApp;
  return <Container maxWidth={false} disableGutters>{renderApp}</Container>;
}

export default App;
