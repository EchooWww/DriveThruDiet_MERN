require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./utils/db"); // Import the Mongoose connection instance
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const cookieSession = require("cookie-session");

// Database connection
connection();

// Middlewares
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
// Database connection

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 7070;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
