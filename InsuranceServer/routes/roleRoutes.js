// roleRoutes.js
const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

// Routes for roles
router.get("/roles", roleController.getAllRoles);
router.get("/roles/:id", roleController.getRoleById);
router.post("/roles", roleController.createRole);
router.put("/roles/:id", roleController.updateRoleById);
router.post("/roles/delete/:id", roleController.deleteRoleById);

module.exports = router;
