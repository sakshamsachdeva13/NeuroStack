const User = require('../models/User')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {

  console.log(process.env.SECRET)
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  console.log(req.body)
  const {username, password} = req.body

  try {
    const user = await User.login(username, password)


    // create a token
    const token = createToken(user._id)
    const message = "login successfull";
    res.status(200).json({username, token , message})
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const {username, password , email , firstName , lastName , phone} = req.body

  try {
    const user = await User.signup(username, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({username, token})
  } catch (error) {
    console.log(error)
    res.status(400).json({error: error.message})
  }
}


const generate = async (req , res) => {
  try {
    const {first_name , last_name , email  , phone} = req.body;
    const username = generateUsername(first_name , last_name , email , phone);
  
    res.status(200).json({
      success : true,
      result : username,
      message : "username generated"
    })
  }
  catch (err) {
     res.status(500).json({
        success : false, 
        result : error,
        message : "Internal server Error"
     })
  }

  
}


function generateUsername(firstname, lastname, email, phone) {
  
  const timestamp = Date.now().toString();
  
  
  const combinedString = firstname + lastname + email + phone + timestamp;
  
  function hashString(str) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
          const char = str.charCodeAt(i);
          hash = (hash << 5) - hash + char;
          hash = hash & hash; // Convert to 32bit integer
      }
      return Math.abs(hash).toString(36); 
  }

  
  const hash = hashString(combinedString);

  const username = hash.substring(0, 6);
  
  return username;
}



module.exports = { signupUser, loginUser , generate }