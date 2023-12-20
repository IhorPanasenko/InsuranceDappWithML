const mongoose = require("mongoose");

const InsurancePolicySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    unique: true,
  },
  insuranceCompanyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InsuranceCompany",
  },
  insuranceCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "InsuranceCategory",
  },
  duration: {
    type: Number,
    required: true,
  },
  premiumAmount: Number,
  coverageAmount: Number,
});

const InsurancePolicy = mongoose.model(
  "InsurancePolicy",
  InsurancePolicySchema
);

module.exports = InsurancePolicy;
