const User = require("../models/User");
const UserConfig = require('../models/userConfig')
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  console.log(process.env.SECRET);
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);

    // create a token
    const token = createToken(user._id);
    const message = "login successfull";
    res.status(200).json({ username, token, message , role : user.role});
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { employee_id, password, email, first_name, last_name, phone } = req.body;

  try {
    const user = await User.signup(req.body);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ employee_id, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const getAllUserLists = async (req, res) => {
  try {
    const result = await User.find({});
    if (!result) {
      return res.status(404).json({
        result: result,
        success: false,
        message: "users not found",
      });
    }
    return res.status(200).json({
      result: result,
      success: true,
      message: "user List found",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const getUserConfig = async (req, res) => {
  const id = req.body.id;
  try {
    const result = await UserConfig.find({ user_id: id });
    if (!result) {
      return res.status(404).json({
        result: result,
        success: false,
        message: "users config not found",
      });
    }
    return res.status(200).json({
      result: result,
      success: true,
      message: "user config List found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const createUserConfig = async (req, res) => {
  const config = req.body;
  try {
    const result = await UserConfig.create(config);
    if (!result) {
      return res.status(404).json({
        result: result,
        success: false,
        message: "users con",
      });
    }
    return res.status(201).json({
      result: result,
      success: true,
      message: "user config List found",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const updateUserConfig = async (req, res) => {
  const config = req.body;
  try {
    const result = await UserConfig.update({ user_id: config.user_id }, config);
    if (!result) {
      return res.status(400).json({
        result: result,
        success: false,
        message: "users config cannot be updated",
      });
    }
    return res.status(201).json({
      result: result,
      success: true,
      message: "user config List updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: err,
    });
  }
};

const generate = async (req, res) => {
  try {
    const { first_name, last_name, email, phone } = req.body;
    const username = generateUsername(first_name, last_name, email, phone);

    res.status(200).json({
      success: true,
      result: username,
      message: "username generated",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      result: error,
      message: "Internal server Error",
    });
  }
};

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

module.exports = {
  signupUser,
  loginUser,
  generate,
  getAllUserLists,
  createUserConfig,
  getUserConfig,
  updateUserConfig,
};
