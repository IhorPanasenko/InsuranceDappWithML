// registrationRoutes.js
const express = require("express");
const router = express.Router();
const authenticationController = require("../controllers/authenticationController");

// Register user endpoint
router.post("/register", authenticationController.registerUser);
router.post("/login", authenticationController.loginUser);

module.exports = router;
