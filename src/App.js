// import "./App.css";
import Login from "./pages/Login/login";
// import Layout from './components/Layout/Layout';
// import Dashboard from './pages/Dashboard/Dashboard';
import classes from './App.module.css'
import { Container, Grid } from "@mui/material";
import SignUp from "./pages/signup/signup";
import SearchUser from "./pages/user/user";
function App() {
  return (
    <Container maxWidth="xl">
        {/* <Login /> */}
        <SignUp />
        {/* <SearchUser /> */}
    </Container>
  );
}

export default App;
