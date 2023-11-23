const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const alertRoutes = require("./routes/alert.routes");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.use("/auth", authRoutes);
app.use("/alert", alertRoutes);

// Endpoint to check if the backend is live
app.get("/", (req, res) => {
  res.send(`<div>Backend is live - Version 0.0.1</div>`);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
