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
  const {username, password} = req.body

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

module.exports = { signupUser, loginUser }