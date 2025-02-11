const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const salesRoutes = require("./routes/salesRoutes.js");
// const authRoutes = require("./routes/authRoutes.js");

dotenv.config();
connectDB();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/sales", salesRoutes);
// app.use("/api/user", authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
