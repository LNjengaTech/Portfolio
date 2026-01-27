//messageRoute.js

const express = require('express');
const { sendContactMessage } = require('../controllers/messageController.js');

const router = express.Router();

//route 4 handling contact form submissions
router.route('/').post(sendContactMessage);

module.exports = router;