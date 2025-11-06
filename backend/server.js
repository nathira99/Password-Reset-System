const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");

dotenv.config();
const app = express();

app.use(express.json());
const cors = require("cors");

app.use(cors({
  origin: ["https://password-reset-system-fe.netlify.app"], 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
}));

app.options("*", cors());


app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

if (process.env.NODE_ENV !== "production") {
  
  app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT}`));
}

module.exports = app; 
