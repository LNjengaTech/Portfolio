//Experience.js model

const mongoose = require('mongoose');

const experienceSchema = mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String },
  period: { type: String, required: true }, // e.g., 'Jan 2023 - Present'
  description: { type: String },
  achievements: [String]
}, { timestamps: true });

const Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;

