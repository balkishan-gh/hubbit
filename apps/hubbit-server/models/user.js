const mongoose = require("mongoose");

// Create a Schema for Users
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

// Create a model from the schema
const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
