//experienceRoutes.js

const express = require('express');
const router = express.Router();
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getExperiences);
router.post('/', protect, createExperience);
router.route('/:id').put(protect, updateExperience).delete(protect, deleteExperience);

module.exports = router;