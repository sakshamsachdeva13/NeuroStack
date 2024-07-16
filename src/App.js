import React , {useCallback, useEffect} from "react";
import { Routes, Route , useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

import Login from "./pages/Login/login";
import Navigation from "./components/Navigation/Navigation";
import Dashboard from "./pages/Dashboard/Dashboard";
import SearchUser from "./pages/user/user";
import CreateUser from "./pages/CreateUser/createUser";
import Page404 from "./pages/page404/page404";
import TreatmentPlanner from "./pages/TreatmentPlanner/TreatmentPlanner";
import {useDispatch, useSelector} from 'react-redux'
import { Toaster } from "react-hot-toast"; // Importing Toaster from react-hot-toast
import * as actions from './store/actions/index.action'
import classes from "./App.module.css";

function App() {

  const dispatch = useDispatch();
  const setUser =  useCallback(() => dispatch(actions.setUser()) , [dispatch]);
  useEffect( () => {
       setUser();
  } , [])
  let user = useSelector(state => state.auth.user);
  
  
  const userType = user ? user.role : null;
  
  const AuthApp = (
    <Routes>
      <Route path="/" exact element={<Login />} />
      <Route element={<Page404 />} />
    </Routes>
  );

  const defaultApp = (
    <>
      <Navigation user={user} />
      <Routes>
        <Route path="/" exact element={<Dashboard />} />
        <Route path="/planner" exact element={<TreatmentPlanner />} />
        <Route element={<Page404 />} />
      </Routes>
    </>
  );


    const adminApp = (
      <>
        <Navigation user ={user}/>
        <Routes>
          <Route path='/' exact element={<SearchUser />} />
          <Route path='/createUser' element={<CreateUser />} />
        </Routes>
      </>
    )
  const renderApp = user.token
    ? userType === "ADMIN"
      ? adminApp
      : defaultApp
    : AuthApp;

    console.log(user);

  return (
    <Container maxWidth={false} disableGutters>
      <div>
        <Toaster /> {/* Rendering Toaster from react-hot-toast */}
      </div>
      {adminApp}
    </Container>
  );
}

export default App;
