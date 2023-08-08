const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, min: 3, max: 20 },
  lastName: { type: String, required: true, min: 3, max: 20 },
  email: { type: String, required: true, min: 6, max: 50 },
  password: { type: String, required: true, min: 6, max: 20 },
  habits: [
    {
      name: String,
      count: Number,
      continuous_count: Number,
      last_checked: Date,
      checked: Boolean,
      checked_dates: [Date],
    },
  ],
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(20).required().label("First Name"),
    lastName: Joi.string().min(3).max(20).required().label("Last Name"),
    email: Joi.string().min(6).max(50).required().email().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(data);
};
module.exports = { User, validate };
