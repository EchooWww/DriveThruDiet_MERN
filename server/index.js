require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./utils/db"); // Import the Mongoose connection instance
const userRoutes = require("./routes/users.js");
const authRoutes = require("./routes/auth.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");

// Database connection
connection();

// Session store
const mongoStore = MongoStore.create({
  mongoUrl: process.env.DB,
  collectionName: "sessions",
});

// Middlewares
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
// Database connection

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: mongoStore,
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const port = process.env.PORT || 7070;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
