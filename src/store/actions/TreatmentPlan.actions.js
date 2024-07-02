import axios from "../../axios_interceptor";
import * as actionTypes from "./actionTypes";

export const createTreatmentPlan = (requestBody) => {

    return dispatch => {
        const url = 'http://localhost:8888/api/Tp/create';
        axios
        .post(url , requestBody)
        .then(res => {
            dispatch({
                type : actionTypes.CREATE_TP,
                data : res.data
            });

            // show Toast about tp created
        })
    }
}


export const getTreatmentPlan = (requestBody) => {

    return dispatch => {
        const url = 'http://localhost:8888/api/Tp/read';
        axios
        .get(url , requestBody)
        .then(res => {
            dispatch({
                type : actionTypes.SET_TP,
                data : res.data
            });

            // show Toast about tp created
        })
    }
}


export const updateTreatmentPlan = (requestBody) => {

    return dispatch => {
        const url = 'http://localhost:8888/api/Tp/update';
        axios
        .post(url , requestBody)
        .then(res => {
            dispatch({
                type : actionTypes.UPDATE_TP,
                data : res.data
            });

            // show Toast about tp created
        })
    }
}
