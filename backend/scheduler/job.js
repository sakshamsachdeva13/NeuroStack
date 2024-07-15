const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

const REGION = "us-east-1";
const FUNCTION_NAME = "fetchPatientDataFromS3"; 

const lambdaClient = new LambdaClient({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

async function invokeLambda() {
  
  const command = new InvokeCommand({
    FunctionName: FUNCTION_NAME,
    InvocationType: "RequestResponse", 
    Payload: JSON.stringify({}), 
  });

  try {
    const { Payload, StatusCode } = await lambdaClient.send(command);
    const result = JSON.parse(new TextDecoder().decode(Payload));

    console.log("Lambda invocation successful");
    console.log("Status Code:", StatusCode);
    console.log("Response:", result);

    return result;
  } catch (error) {
    console.error("Error invoking Lambda function:", error);
    throw error;
  }
}

// Example usage
// invokeLambda()
//   .then((result) => {
//     // Handle the result
//     console.log("Processed result:", result);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

module.exports = invokeLambda;
