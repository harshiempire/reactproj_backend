const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pwsd: {
    type: String,
    required: true,
  },
  cpwsd: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("pwsd")) {
    try {
      this.pwsd = await bcrypt.hash(this.pwsd, 12);
      this.cpwsd = await bcrypt.hash(this.cpwsd, 12);
    } catch (error) {
      console.error("Error hashing password:", error);
    }
  }
  next();
});

// generation of token
userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

const users = new mongoose.model("users", userSchema);

module.exports = users;
