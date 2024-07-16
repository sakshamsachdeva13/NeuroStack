import axios from "../../axios_interceptor";
import toast from "react-hot-toast";
import * as actionTypes from "./actionTypes";

export const getUserConfig = ({doctor_id , patient_id}) => {
  return (dispatch) => {
    const url = `http://localhost:8888/admin/get-config/${doctor_id}/${patient_id}`;
    axios
      .get(url)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_USER_CONFIG,
          data: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
        toast(err.message);
      });
  };
};

export const getAlluserList = () => {
  return (dispatch) => {
    const url = "http://localhost:8888/admin/get-all-user";

    axios
      .get(url)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_ALL_USERS,
          data: res.data,
        });
      })
      .catch((err) => {
        toast(err.message);
      });
  };
};

export const createUserConfig = (userConfig) => {
  return (dispatch) => {
    const url = "http://localhost:8888/admin/create-config";

    axios
      .post(url, userConfig)
      .then((res) => {
        dispatch({
          type: actionTypes.CREATE_USER_CONFIG,
          data: res.data,
        });
      })
      .catch((err) => {
        toast(err.message);
      });
  };
};

export const updateUserConfig = (userConfig) => {
  return (dispatch) => {
    const url = "http://localhost:8888/admin/update-config";

    axios
      .post(url, userConfig)
      .then((res) => {
        dispatch({
          type: actionTypes.UPDATE_USER_CONFIG,
          data: res.data,
        });
      })
      .catch((err) => {
        toast(err.message);
      });
  };
};

export const getPatientData = (patient_id) => {
  return (dispatch) => {
    const url = `http://localhost:8888/admin/get-patients`;

    axios
      .get(url)
      .then((res) => {
        dispatch({
          type: actionTypes.GET_PATIENT,
          data: res.data,
        });
      })
      .catch((err) => {
        toast(err.message);
      });
  };
};
