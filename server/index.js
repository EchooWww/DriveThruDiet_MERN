require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");

// Database connection
connection();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 7070;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
