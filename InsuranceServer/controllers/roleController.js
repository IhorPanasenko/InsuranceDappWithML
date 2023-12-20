// roleController.js
const Role = require("../models/role");

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get role by ID
const getRoleById = async (req, res) => {
  const { id } = req.params;
  console.log("id");
  try {
    const role = await Role.findById(id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json(role);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new role
const createRole = async (req, res) => {
  const { roleName } = req.body;

  try {
    const newRole = new Role({ roleName });
    const savedRole = await newRole.save();

    res.status(201).json(savedRole);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update role by ID
const updateRoleById = async (req, res) => {
  const { id } = req.params;
  const { roleName } = req.body;

  try {
    const role = await Role.findByIdAndUpdate(id, { roleName }, { new: true });

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json(role);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete role by ID
const deleteRoleById = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await Role.findByIdAndDelete(id);

    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }

    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRoleById,
  deleteRoleById,
};
