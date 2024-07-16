import toast from "react-hot-toast";
import axios from "../../axios_interceptor";
import * as actionTypes from "./actionTypes";

export const createTreatmentPlan = (requestBody) => {
  return (dispatch) => {
    const url = "http://localhost:8888/api/Tp/create";
    axios
      .post(url, requestBody)
      .then((res) => {
        dispatch({
          type: actionTypes.CREATE_TP,
          data: res.data,
        });
        toast(res.data.message);

        // show Toast about tp created
      })
      .catch((err) => {
        toast(err.message);
      });
  };
};

export const getTreatmentPlan = (requestBody) => {
  console.log(requestBody);
  return (dispatch) => {
    const url = "http://localhost:8888/api/Tp/read";
    axios
      .post(url, requestBody)
      .then((res) => {
        console.log(res);
        dispatch({
          type: actionTypes.SET_TP,
          data: res.data.result,
        });

        // show Toast about tp created
      })
      .catch((err) => {
        toast(err.message);
      });
  };
};

export const updateTreatmentPlan = (requestBody) => {
  return (dispatch) => {
    const url = "http://localhost:8888/api/Tp/update";
    axios.post(url, requestBody).then((res) => {
      dispatch({
        type: actionTypes.UPDATE_TP,
        data: res.data,
      });
      toast(res.data.message);
      // show Toast about tp created
    });
  };
};
