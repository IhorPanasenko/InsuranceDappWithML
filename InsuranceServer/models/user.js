const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String, // Store hashed passwords
  address: {
    country: String,
    city: String,
    street: String,
    houseNumber: String,
    postIndex: String,
  },
  phoneNumber: String,
  dateOfBirth: Date,
  ethereumAccount: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
  },
  // Other user-related fields as needed
});

const User = mongoose.model("User", UserSchema);

module.exports = User;