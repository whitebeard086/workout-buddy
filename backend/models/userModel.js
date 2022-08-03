const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
userSchema.statics.signup = async function(email, password) {
    const userExists = await this.findOne({ email });

    if (userExists) {
        throw new Error("Email already in use!")
    }

    // generate salt
    const salt = await bcrypt.genSalt(10);
    // hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await this.create({ email, password: hashedPassword });

    return user;
}

module.exports = mongoose.model("User", userSchema);
