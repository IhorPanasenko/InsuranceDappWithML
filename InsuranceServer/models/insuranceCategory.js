const mongoose = require("mongoose");

const InsuranceCategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  // Other fields for insurance category details
});

const InsuranceCategory = mongoose.model(
  "InsuranceCategory",
  InsuranceCategorySchema
);

module.exports = InsuranceCategory;
