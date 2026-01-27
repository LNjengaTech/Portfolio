//experienceController.js

const asyncHandler = require('express-async-handler');
const Experience = require('../models/Experience');

//Public: Get all experiences
const getExperiences = asyncHandler(async (req, res) => {
  const experiences = await Experience.find({}).sort({ createdAt: -1 });
  res.json(experiences);
});

//Admin: Create experience
const createExperience = asyncHandler(async (req, res) => {
  const { title, company, period, description, achievements } = req.body;
  if (!title || !period) {
    res.status(400);
    throw new Error('Missing required fields');
  }
  const experience = new Experience({
    title,
    company,
    period,
    description,
    achievements: achievements || []
  });
  const createdExperience = await experience.save();
  res.status(201).json(createdExperience);
});

//Admin: Update experience
const updateExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (experience) {
    experience.title = req.body.title || experience.title;
    experience.company = req.body.company || experience.company;
    experience.period = req.body.period || experience.period;
    experience.description = req.body.description || experience.description;
    experience.achievements = req.body.achievements || experience.achievements;
    const updatedExperience = await experience.save();
    res.json(updatedExperience);
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});

//Admin: Delete experience
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);
  if (experience) {
    await Experience.deleteOne({ _id: experience._id });
    res.json({ message: 'Experience removed' });
  } else {
    res.status(404);
    throw new Error('Experience not found');
  }
});

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };