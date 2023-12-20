// insuranceCompanyController.js
const InsuranceCompany = require("../models/insuranceCompany");

// Get all insurance companies
const getAllInsuranceCompanies = async (req, res) => {
  try {
    const insuranceCompanies = await InsuranceCompany.find();
    res.json(insuranceCompanies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get insurance company by ID
const getInsuranceCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const insuranceCompany = await InsuranceCompany.findById(id);
    if (!insuranceCompany) {
      return res.status(404).json({ message: "Insurance company not found" });
    }

    res.json(insuranceCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new insurance company
const createInsuranceCompany = async (req, res) => {
  const { name, address, contactPerson, phoneNumber, email } = req.body;

  try {
    const newInsuranceCompany = new InsuranceCompany({
      name,
      address,
      contactPerson,
      phoneNumber,
      email,
      // Other fields as needed
    });

    const savedInsuranceCompany = await newInsuranceCompany.save();
    res.status(201).json(savedInsuranceCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update insurance company by ID
const updateInsuranceCompanyById = async (req, res) => {
  const { id } = req.params;
  const { name, address, contactPerson, phoneNumber, email } = req.body;

  try {
    const insuranceCompany = await InsuranceCompany.findByIdAndUpdate(
      id,
      {
        name,
        address,
        contactPerson,
        phoneNumber,
        email,
        // Update other fields as needed
      },
      { new: true }
    );

    if (!insuranceCompany) {
      return res.status(404).json({ message: "Insurance company not found" });
    }

    res.json(insuranceCompany);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete insurance company by ID
const deleteInsuranceCompanyById = async (req, res) => {
  const { id } = req.params;

  try {
    const insuranceCompany = await InsuranceCompany.findByIdAndDelete(id);

    if (!insuranceCompany) {
      return res.status(404).json({ message: "Insurance company not found" });
    }

    res.json({ message: "Insurance company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllInsuranceCompanies,
  getInsuranceCompanyById,
  createInsuranceCompany,
  updateInsuranceCompanyById,
  deleteInsuranceCompanyById,
};
