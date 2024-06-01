const mongoose = require('mongoose');

const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();

// import model

const patientsRecordRetriver = () => {

    // call for the api 

const params = {
    FunctionName: 'your-lambda-function-name',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify({ key: 'value' })
};

lambda.invoke(params, (error, data) => {
    if (error) {
        console.error('Error invoking Lambda function:', error);
        return;
    }

    const responsePayload = JSON.parse(data.Payload);
    console.log('Response from Lambda:', responsePayload);
});

    
    // call for data processing function 

    // save data into database 

}


const  dataProcessor = (rawData) => {
    
    //  process data into respective collectrions 

    

    return {}  // return collection obj 
}


module.exports = patientsRecordRetriver