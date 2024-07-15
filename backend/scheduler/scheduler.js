const { CronJob }= require('cron');
const invokeLambda = require('./job')


const job = new CronJob(
    time , 
    invokeLambda,
    // more config coming ..
)
job.start();