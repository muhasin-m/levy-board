const express = require("express");
const { getDashboardData,addDashboardData } = require("../controllers/salesController.js");
const router = express.Router();

router.get("/", getDashboardData);
router.post("/add-data",addDashboardData)

module.exports = router;
