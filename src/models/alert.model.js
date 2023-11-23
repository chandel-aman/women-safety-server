// models/Alert.js
const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  locationLink: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  name: { type: String },
  address: { type: String },
  phoneNumber: { type: String, required: true },
  emergencyNumber: { type: String, required: true },
  time: { type: Date, default: Date.now },
});

const Alert = mongoose.model("Alert", alertSchema);

module.exports = Alert;
