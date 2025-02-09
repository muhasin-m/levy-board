const SalesData = require("../models/SalesData.js");

// Get all sales data
const getDashboardData = async (req, res) => {
  try {
    const data = await SalesData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

// Add sales data
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

module.exports = { getDashboardData, addDashboardData };
