//skillController.js

const asyncHandler = require('express-async-handler');
const Skill = require('../models/Skill');

//Public: Get all skills
const getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({}).sort({ category: 1 });
  res.json(skills);
});

//Admin: Create skill
const createSkill = asyncHandler(async (req, res) => {
  const { name, level, icon, category } = req.body;
  if (!name || !level || !category) {
    res.status(400);
    throw new Error('Missing required fields');
  }
  const skill = new Skill({ name, level, icon, category });
  const createdSkill = await skill.save();
  res.status(201).json(createdSkill);
});

//Admin: Update skill
const updateSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (skill) {
    skill.name = req.body.name || skill.name;
    skill.level = req.body.level || skill.level;
    skill.icon = req.body.icon || skill.icon;
    skill.category = req.body.category || skill.category;
    const updatedSkill = await skill.save();
    res.json(updatedSkill);
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

//Admin: Delete skill
const deleteSkill = asyncHandler(async (req, res) => {
  const skill = await Skill.findById(req.params.id);
  if (skill) {
    await Skill.deleteOne({ _id: skill._id });
    res.json({ message: 'Skill removed' });
  } else {
    res.status(404);
    throw new Error('Skill not found');
  }
});

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };