// insuranceCategoryController.js
const InsuranceCategory = require('../models/insuranceCategory');

// Get all insurance categories
const getAllInsuranceCategories = async (req, res) => {
  try {
    const insuranceCategories = await InsuranceCategory.find();
    res.json(insuranceCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get insurance category by ID
const getInsuranceCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const insuranceCategory = await InsuranceCategory.findById(id);
    if (!insuranceCategory) {
      return res.status(404).json({ message: 'Insurance category not found' });
    }

    res.json(insuranceCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new insurance category
const createInsuranceCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newInsuranceCategory = new InsuranceCategory({
      name,
      description,
      // Other fields as needed
    });

    const savedInsuranceCategory = await newInsuranceCategory.save();
    res.status(201).json(savedInsuranceCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update insurance category by ID
const updateInsuranceCategoryById = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const insuranceCategory = await InsuranceCategory.findByIdAndUpdate(
      id,
      {
        name,
        description,
        // Update other fields as needed
      },
      { new: true }
    );

    if (!insuranceCategory) {
      return res.status(404).json({ message: 'Insurance category not found' });
    }

    res.json(insuranceCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete insurance category by ID
const deleteInsuranceCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const insuranceCategory = await InsuranceCategory.findByIdAndDelete(id);

    if (!insuranceCategory) {
      return res.status(404).json({ message: 'Insurance category not found' });
    }

    res.json({ message: 'Insurance category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllInsuranceCategories,
  getInsuranceCategoryById,
  createInsuranceCategory,
  updateInsuranceCategoryById,
  deleteInsuranceCategoryById,
};
