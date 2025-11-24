// server/routes/commandRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getCommands, 
    getCommandByName, 
    createCommand, 
    updateCommand, 
    deleteCommand 
} = require('../controllers/commandController');
const { protect } = require('../middleware/authMiddleware'); // Import protection middleware

// Public Routes (Terminal Read Access)
// GET /api/commands - Get all commands
// POST /api/commands - Create a new command (Protected)
router.route('/')
    .get(getCommands) 
    .post(protect, createCommand); 

// Public Route for single command output
// GET /api/commands/help - Get output for 'help'
router.get('/:name', getCommandByName);

// Admin Protected Routes (Update/Delete by ID)
// PUT /api/commands/:id - Update command
// DELETE /api/commands/:id - Delete command
router.route('/:id')
    .put(protect, updateCommand)
    .delete(protect, deleteCommand);


module.exports = router;