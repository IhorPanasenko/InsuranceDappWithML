const express = require("express");
const router = express.Router();
const insurancePolicyController = require("../controllers/insurancePolicyController");

router.get(
  "/insurancePolicies",
  insurancePolicyController.getAllInsurancePolicies
);
router.get(
  "/insurancePolicies/:id",
  insurancePolicyController.getInsurancePolicyById
);
router.post(
  "/insurancePolicies",
  insurancePolicyController.createInsurancePolicy
);
router.put(
  "/insurancePolicies/:id",
  insurancePolicyController.updateInsurancePolicyById
);
router.delete(
  "/insurancePolicies/:id",
  insurancePolicyController.deleteInsurancePolicyById
);

module.exports = router;
