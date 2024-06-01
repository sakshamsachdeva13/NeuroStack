const { CronJob }= require('cron');
const patientsRecordRetriver = require('./job')


const job = new CronJob(
    time , 
    patientsRecordRetriver,
    // more config coming ..
)
job.start();