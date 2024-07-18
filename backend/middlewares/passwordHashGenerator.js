const sendEmail = require('../utils/mailer')

const passwordGenerator = (req , res , next) => {

    const {first_name, last_name, department, phone , employee_id
    } = req.body;
        // Characters to be used in the password
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        // Function to generate a random number within a range
        function getRandomInt(max) {
          return Math.floor(Math.random() * max);
        }
      
        // Generate a random 6-character alphanumeric password
        let password = '';
        for (let i = 0; i < 6; i++) {
          password += characters[getRandomInt(characters.length)];
        }
        
          
        req.body.password = password;
        next();
        
      }
      
      // Example usage
     

module.exports = passwordGenerator