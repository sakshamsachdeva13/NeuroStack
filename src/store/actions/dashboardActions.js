import axios from 'axios';
import * as actionTypes from './actionTypes';
import toast from 'react-hot-toast';


export const getPatientRecords = (filterData) => {
    return (dispatch) => {
        const url = 'http://localhost:8888/dashboard/get-patient-records';

        axios.post(url , filterData).then(res => {
            dispatch({
                type : actionTypes.GET_PATIENTS_RECORD,
                data : res.data
            })
        }).catch(err => {
            toast(err.message);
        })
    }
} 