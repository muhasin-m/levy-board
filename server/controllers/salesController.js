const SalesData = require("../models/SalesData.js");

// Get all sales records
const getDashboardData = async (req, res) => {
  try {
    const data = await SalesData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

// Create a new sales record
const addDashboardData = async (req, res) => {
  const { month, plan, actual, workingDays } = req.body;
  try {
    const newSale = new SalesData({ month, plan, actual, workingDays });
    await newSale.save();
    res.status(201).json(newSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a sales record
const updateSalesRecord = async (req, res) => {
  try {
    const updatedSale = await SalesData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remove a sales record
const removeSalesRecord = async (req, res) => {
  try {
    await SalesData.findByIdAndDelete(req.params.id);
    res.json({ message: "Sale record deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getDashboardData,
  addDashboardData,
  updateSalesRecord,
  removeSalesRecord,
};
