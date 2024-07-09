const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "USER",
    enum: ["USER", "ADMIN"],
  },
});

// static signup method
userSchema.statics.signup = async function ({
  employee_id,
  password,
  email,
  first_name,
  last_name,
  phone,
}) {
  console.log("model sign up", employee_id, "    ", password);

  // validation
  if (
    !employee_id ||
    !password ||
    !email ||
    !first_name ||
    !last_name ||
    !phone
  ) {
    throw Error("All fields must be filled");
  }
  // if (!validator.isEmail(email)) {
  //   throw Error('Email not valid')
  // }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error('Password not strong enough')
  // }

  const exists = await this.findOne({ username: employee_id });

  if (exists) {
    throw Error("username already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    username: employee_id,
    password: hash,
    phone,
    firstname: first_name,
    lastname: last_name,
    email,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("Incorrect username");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
