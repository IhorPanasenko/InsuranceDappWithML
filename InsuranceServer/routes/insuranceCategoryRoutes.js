// insuranceCategoryRoutes.js
const express = require("express");
const router = express.Router();
const insuranceCategoryController = require("../controllers/insuranceCategoryController");

// Routes for insurance categories
router.get(
  "/insuranceCategories/all",
  insuranceCategoryController.getAllInsuranceCategories
);
router.get(
  "/insuranceCategories/:id",
  insuranceCategoryController.getInsuranceCategoryById
);
router.post(
  "/insuranceCategories/create",
  insuranceCategoryController.createInsuranceCategory
);
router.put(
  "/insuranceCategories/update:id",
  insuranceCategoryController.updateInsuranceCategoryById
);
router.delete(
  "/insuranceCategories/delete:id",
  insuranceCategoryController.deleteInsuranceCategoryById
);

module.exports = router;
