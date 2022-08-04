const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// static signup method
userSchema.statics.signup = async function (email, password) {
  // validate email and password
  if (!email || !password) {
    throw new Error("All fields must be filled!");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Please enter a valid email!");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  // check if user already exists
  const userExists = await this.findOne({ email });

  if (userExists) {
    throw new Error("Email already in use!");
  }

  // generate salt
  const salt = await bcrypt.genSalt(10);
  // hash password
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await this.create({ email, password: hashedPassword });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // validate input fields
  if (!email || !password) {
    throw new Error("All fields must be filled!");
  }

  // find user by email
  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Email is incorrect!");
  }

  // compare password
  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new Error("Password is incorrect!");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
