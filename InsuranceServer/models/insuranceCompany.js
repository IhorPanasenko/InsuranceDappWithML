const mongoose = require("mongoose");

const InsuranceCompanySchema = new mongoose.Schema({
  name: String,
  address: String,
  contactPerson: String,
  phoneNumber: String,
  email: String,
  // Other fields for insurance company details
});

const InsuranceCompany = mongoose.model(
  "InsuranceCompany",
  InsuranceCompanySchema
);

module.exports = InsuranceCompany;
