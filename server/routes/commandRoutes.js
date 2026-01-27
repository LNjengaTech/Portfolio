//commandRoutes.js

const express = require('express');
const router = express.Router();
const { getCommands, getCommandByName, createCommand, updateCommand, deleteCommand 
} = require('../controllers/commandController');
const { protect } = require('../middleware/authMiddleware'); //Import protection middleware

// Public Routes (Terminal Read Access)
router.route('/')
    .get(getCommands) 
    .post(protect, createCommand); 

// Public Route for single command output
router.get('/:name', getCommandByName);

// Admin Protected Routes (Update/Delete by ID)
router.route('/:id')
    .put(protect, updateCommand)
    .delete(protect, deleteCommand);


module.exports = router;