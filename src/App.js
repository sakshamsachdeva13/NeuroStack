// import "./App.css";
import Login from "./pages/Login/login";
// import Layout from './components/Layout/Layout';
// import Dashboard from './pages/Dashboard/Dashboard';
import classes from './App.module.css'
import { Container, Grid } from "@mui/material";
function App() {
  return (
    <Container maxWidth="xl">
        <Login />
    </Container>
  );
}

export default App;
