// insurancePolicyController.js
const InsurancePolicy = require('../models/insurancePolicy');

// Get all insurance policies
const getAllInsurancePolicies = async (req, res) => {
  try {
    const insurancePolicies = await InsurancePolicy.find()
      .populate('insuranceCompanyId')
      .populate('insuranceCategoryId');
    res.json(insurancePolicies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get insurance policy by ID
const getInsurancePolicyById = async (req, res) => {
  const { id } = req.params;

  try {
    const insurancePolicy = await InsurancePolicy.findById(id)
      .populate('insuranceCompanyId')
      .populate('insuranceCategoryId');

    if (!insurancePolicy) {
      return res.status(404).json({ message: 'Insurance policy not found' });
    }

    res.json(insurancePolicy);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new insurance policy
const createInsurancePolicy = async (req, res) => {
  const {
    policyNumber,
    insuranceCompanyId,
    insuranceCategoryId,
    duration,
    premiumAmount,
    coverageAmount,
    // Other fields as needed
  } = req.body;

  try {
    const newInsurancePolicy = new InsurancePolicy({
      policyNumber,
      insuranceCompanyId,
      insuranceCategoryId,
      duration,
      premiumAmount,
      coverageAmount,
      // Other fields as needed
    });

    const savedInsurancePolicy = await newInsurancePolicy.save();
    res.status(201).json(savedInsurancePolicy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update insurance policy by ID
const updateInsurancePolicyById = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedInsurancePolicy = await InsurancePolicy.findByIdAndUpdate(id, updateData, {
      new: true,
    })
      .populate('insuranceCompanyId')
      .populate('insuranceCategoryId');

    if (!updatedInsurancePolicy) {
      return res.status(404).json({ message: 'Insurance policy not found' });
    }

    res.json(updatedInsurancePolicy);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete insurance policy by ID
const deleteInsurancePolicyById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedInsurancePolicy = await InsurancePolicy.findByIdAndDelete(id);

    if (!deletedInsurancePolicy) {
      return res.status(404).json({ message: 'Insurance policy not found' });
    }

    res.json({ message: 'Insurance policy deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllInsurancePolicies,
  getInsurancePolicyById,
  createInsurancePolicy,
  updateInsurancePolicyById,
  deleteInsurancePolicyById,
};
