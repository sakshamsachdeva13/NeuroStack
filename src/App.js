// import "./App.css";
import Login from "./pages/Login/login";
import Navigation from "./components/Navigation/Navigation";
// import Layout from './components/Layout/Layout';
// import Dashboard from './pages/Dashboard/Dashboard';
import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { Container, Grid } from "@mui/material";
import { Dashboard } from "@mui/icons-material";
import TreatmentPlanner from "./pages/TreatmentPlanner/TreatmentPlanner";
import Page404 from "./pages/page404/page404";
function App() {
  const isAuthenticated = true;

  const AuthApp = (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route element={<Page404 />} />
    </Routes>
  );

  const defaultApp = (
    <>
      <Navigation />
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/planner" exact element={<TreatmentPlanner />} />
        <Route element={<Page404 />} />
      </Routes>
    </>
  );

  const renderApp = isAuthenticated ? defaultApp : AuthApp;
  return <Container maxWidth="xl">{renderApp}</Container>;
}

export default App;
