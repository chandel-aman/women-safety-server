// controllers/alertController.js
const Alert = require('../models/alert.model');

exports.createAlert = async (req, res) => {
  const { locationLink, latitude, longitude, name, address, phoneNumber, emergencyNumber } = req.body;

  try {
    const alert = new Alert({
      locationLink,
      latitude,
      longitude,
      name,
      address,
      phoneNumber,
      emergencyNumber,
    });

    await alert.save();

    res.status(201).json({ message: 'Alert created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.status(200).json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
