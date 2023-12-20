// userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes for users
router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.put("/users/:id", userController.updateUserById);
router.delete("/users/:id", userController.deleteUserById);

module.exports = router;
