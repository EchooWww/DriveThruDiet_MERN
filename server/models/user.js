const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, minlength: 2, maxlength: 20 },
  lastName: { type: String, required: true, minlength: 2, maxlength: 20 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthday: {
    type: Date,
    required: true,
    min: "1900-01-01",
    max: "2010-01-01",
  },
  age: { type: Number },
  height: { type: Number },
  weight: { type: Number },
  activity: { type: String },
  goal: { type: String },
  calorieGoal: { type: Number },
  proteinGoal: { type: Number },
  carbGoal: { type: Number },
  fatGoal: { type: Number },
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
    birthday: Joi.date().required().label("Birthday"),
  });
  return schema.validate(data);
};
module.exports = { User, validate };
