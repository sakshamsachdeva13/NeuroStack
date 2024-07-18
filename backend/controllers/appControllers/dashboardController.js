const Patient = require('../../models/Patient');
const mongoose  = require('mongoose');

const getPatientRecords = async (req , res) => {

    const {patient_id } = req.body;
        //  I have to create query on the basis of filters I'll be given ;
        // and have to fetch data seperately from collections 
        // club that data into one process that data according to frontend needs 
        // then send ;
    console.log('this is patient_id' , patient_id);
}


module.exports = {
    getPatientRecords
}