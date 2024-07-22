const { CronJob }= require('cron');
const invokeLambda = require('./job')

const time = "00 5 * * *"
const job = new CronJob(
    time , 
    invokeLambda,
    
)

job.start();