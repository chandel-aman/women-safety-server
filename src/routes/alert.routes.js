// routes/alertRoutes.js
const express = require('express');
const alertController = require('../controllers/alert.controller');
const authenticate = require('../middleware/authenticate.middleware');

const router = express.Router();

router.post('/create', authenticate, alertController.createAlert);
router.get('/all', authenticate, alertController.getAllAlerts);

module.exports = router;
