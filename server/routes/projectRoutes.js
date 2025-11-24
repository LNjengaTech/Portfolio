// server/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const { 
    getProjects, 
    getProjectByCommand, 
    createProject, 
    updateProject, 
    deleteProject 
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware'); // Import protection middleware

// Public Routes (Terminal Read Access)
router.get('/', getProjects); // Fetches all projects (e.g., for 'projects' command)
router.get('/:command', getProjectByCommand); // Fetches a single project (e.g., for 'project <name>' command)


// Admin Protected Routes (CRUD)
// The POST route is used to CREATE a new project, protected by 'protect'
router.route('/')
    .post(protect, createProject); 

// The PUT and DELETE routes are used for UPDATE and DELETE operations, protected by 'protect'
router.route('/:id')
    .put(protect, updateProject)
    .delete(protect, deleteProject);


module.exports = router;