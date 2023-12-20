// insuranceCompanyRoutes.js
const express = require("express");
const router = express.Router();
const insuranceCompanyController = require("../controllers/insuranceCompanyController");

// Routes for insurance companies
router.get(
  "/insuranceCompanies",
  insuranceCompanyController.getAllInsuranceCompanies
);
router.get(
  "/insuranceCompanies/:id",
  insuranceCompanyController.getInsuranceCompanyById
);
router.post(
  "/insuranceCompanies",
  insuranceCompanyController.createInsuranceCompany
);
router.put(
  "/insuranceCompanies/:id",
  insuranceCompanyController.updateInsuranceCompanyById
);
router.delete(
  "/insuranceCompanies/:id",
  insuranceCompanyController.deleteInsuranceCompanyById
);

module.exports = router;
