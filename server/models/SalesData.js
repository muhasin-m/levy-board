const mongoose = require("mongoose");

const SaleDataSchema = new mongoose.Schema({
  month: { type: String, required: true },
  plan: { type: Number, required: true },
  actual: { type: Number, required: true },
  workingDays: { type: Number, required: true },
});

module.exports = mongoose.model("Sales", SaleDataSchema);
