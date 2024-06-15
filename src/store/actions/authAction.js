import axios from "../../axios_interceptor";
import * as actions from "./index.action";
import * as actionTypes from "./actionTypes";
export const login = (credentials) => {
  return (dispatch) => {
    const url = "http://localhost:8888/api/login";
    axios
      .post(url, credentials)
      .then((res) => {
        dispatch({
          type: actionTypes.SET_USER,
          data: res.data,
        });

        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("user", JSON.stringify(res.data.user));

        setTimeout(() => {
        //   window.location.replace("/");
        alert("login successfull")
        }, 1000);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
};
