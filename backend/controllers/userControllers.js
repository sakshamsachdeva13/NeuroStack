const User = require("../models/User");
const Patient = require("../models/Patient");
const UserConfig = require("../models/userConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const sendEmail = require("../utils/mailer");
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
    res.status(200).json({ username, token, message, role: user.role });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { employee_id, password, email, first_name, last_name, phone } =
    req.body;

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

const getPatientData = async (req, res) => {
  try {
    const result = await Patient.find({});
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
  console.log(req.body);
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

const forgotPassword = async (req, res) => {
  // check and verify that email is correct
  const email = req.body.email;

  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(404).json({
      success: true,
      result: null,
      message: "User not registred !!",
    });
  }
  const secret = process.env.SECRET;
  const payload = {
    email: user.email,
    id: user._id,
  };
  const token = jwt.sign(payload, secret, { expiresIn: "15m" });

  const link = `http://localhost:8888/auth/reset-password/${user._id}/${token}`;
  
  sendEmail({
    recepientMailId: user.email,
    subject: "Reset Password Link",
    text: `this is your reset password link \n ${link}`,
  });

  console.log(link);

  res.send("reset link has been sent to registered email");
};
const getResetPassword = async (req, res) => {
  //  check the token and render the reset password ejs ;
  const { id, token } = req.params;
  const user = await User.find({ _id: id });

  if (!user) {
    res.status(400).json({
      success: false,
      message: "User does not exit !!",
      result: null,
    });
  }
  // We have a valid id, and we have a valid user with this id
  const secret = process.env.SECRET;
  try {
    const payload = jwt.verify(token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(error.message);
    res.send(error.message);
  }
};

const postResetPassword = async (req, res) => {
  //  change the password ;
  console.log(req.body);
  const { newPassword, confirmPassword, id } = req.body;
  console.log(id);
  // hash and update password here
  if (newPassword === confirmPassword) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    // const userId = ;

    const result = await User.findByIdAndUpdate(
      { _id: id },
      { $set: { password: hash } }
    );
    console.log(result);
    res.render("reset-success");
  } else {
    res.render("reset-failed", {
      message: "400 bad request !! password could not be changed",
    });
  }
};
function generateUsername(firstname, lastname, email, phone) {
  // Extract parts of the first name, last name, and email
  const firstNamePart = firstname.substring(0, 3).toLowerCase();
  const lastNamePart = lastname.substring(0, 3).toLowerCase();
  const emailPart = email.split("@")[0].substring(0, 3).toLowerCase();

  // Generate a short unique identifier using the current timestamp
  const timestamp = Date.now().toString().slice(-4); // last 4 digits of the timestamp

  // Define possible patterns
  const patterns = [
    `${firstNamePart}${lastNamePart}${emailPart}${timestamp}`,
    `${lastNamePart}${firstNamePart}${timestamp}${emailPart}`,
    `${emailPart}${firstNamePart}${timestamp}${lastNamePart}`,
    `${firstNamePart}${timestamp}${lastNamePart}${emailPart}`,
    `${lastNamePart}${timestamp}${firstNamePart}${emailPart}`,
  ];

  // Select a pattern randomly
  const randomIndex = Math.floor(Math.random() * patterns.length);
  let username = patterns[randomIndex];

  // Ensure the username does not start with a number or digit
  if (!isNaN(username.charAt(0))) {
    username = `${firstNamePart}${lastNamePart}${emailPart}${timestamp}`; // default pattern if random one starts with a digit
  }

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
  forgotPassword,
  getResetPassword,
  postResetPassword,
  getPatientData,
};
