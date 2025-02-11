const express = require("express");
const {
  getDashboardData,
  addDashboardData,
  updateSalesRecord,
  removeSalesRecord,
} = require("../controllers/salesController.js");
const router = express.Router();

router.get("/", getDashboardData);
router.post("/add-data", addDashboardData);
router.put("/update-data/:id", updateSalesRecord);
router.delete("/delete-data/:id", removeSalesRecord);

module.exports = router;
