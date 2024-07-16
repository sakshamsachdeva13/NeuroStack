import axios from "../../axios_interceptor";
import toast from "react-hot-toast";
// import * as actions from "./index.action";
import * as actionTypes from "./actionTypes";
export const login = (credentials) => {
  return (dispatch) => {
    const url = "http://localhost:8888/auth/login";
    axios
      .post(url, credentials)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          data: res.data,
        });
        console.log(res.data);
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        dispatch({
          type: actionTypes.SET_USER,
          data: res.data,
        });
        setTimeout(() => {
          window.location.replace("/");
          toast("login successfull");
        }, 1000);
      })
      .catch((err) => {
        console.log("Error", err);
        toast(err.message);
      });
  };
};

export const signup = (userData) => {
  return (dispatch) => {
    const url = "http://localhost:8888/auth/signup";
    axios
      .post(url, userData)
      .then((res) => {
       
        setTimeout(() => {
          //   window.location.replace("/");
          toast("signup successfull");
        }, 1000);
      })
      .catch((err) => {
        toast(err.message);
        console.log("Error", err);
      });
  };
};

export const generateUsername = (userData) => {
  return (dispatch) => {
    const url = "http://localhost:8888/auth/generate";
    axios
      .post(url, userData)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USERNAME,
          data: res.data.result,
        });
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
};

export const sendLinkToEmail = (email) => {
  return (dispatch) => {
    const url = "http://localhost:8888/auth/forgot-password";
    axios
      .post(url, email)
      .then((res) => {
        dispatch({ type: actionTypes.SEND_RESET_LINK, data: res.data });
        toast("Email has been sent to registred Email");
      })
      .catch((err) => {
        toast(err.message);
        console.log("Error", err);
      });
  };
};

export const setUser =  () => {

  return  (dispatch) => {
    const user = sessionStorage.getItem("user") || localStorage.getItem("user");
    dispatch({
      type: actionTypes.SET_USER,
      data: user ? JSON.parse(user) : {}
    });
  };
} 
