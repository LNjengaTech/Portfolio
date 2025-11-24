// server/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { authUser, registerUser } = require('../controllers/userController');

// POST /api/users/login (Admin Login)
router.post('/login', authUser);

// POST /api/users (Initial Admin Registration)
// This route should only be used once for initial setup.
router.post('/', registerUser);

module.exports = router;