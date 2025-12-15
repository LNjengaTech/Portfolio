const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');

const { 
    getProjects, 
    getProjectByCommand,
    getProjectById,
    createProject, 
    updateProject, 
    deleteProject,
    uploadProjectImage,
} = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware'); // Import protection middleware

//Public Routes
router.get('/', getProjects);
router.get('/id/:id', getProjectById); //get by ID for GUI
router.get('/:command', getProjectByCommand); //get by terminal command for CLI


//Admin Protected Routes
router.route('/').post(protect, createProject); 
router.route('/:id').put(protect, updateProject)
    .delete(protect, deleteProject);

//image upload route
router.post('/upload', protect, upload.single('image'), uploadProjectImage);

module.exports = router;