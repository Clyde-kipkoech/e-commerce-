const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");


const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" MongoDB Connected"))
  .catch(err => console.log("DB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
