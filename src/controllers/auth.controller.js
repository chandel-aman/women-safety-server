// controllers/authController.js
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create and send a token
    const token = jwt.sign({ adminId: admin._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.signup = async (req, res) => {
  const { name, email, password, phoneNumber, address } = req.body;

  try {
    // Check if the email is already registered
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const admin = new Admin({
      name,
      email,
      password,
      phoneNumber,
      address,
    });

    await admin.save();

    // Create and send a token upon successful signup
    const token = jwt.sign({ adminId: admin._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
