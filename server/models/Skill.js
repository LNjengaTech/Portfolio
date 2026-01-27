//Skill.js model
const mongoose = require('mongoose');

const skillSchema = mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String }, //e.g'FaReact' or icon URL
  category: { type: String, required: true } // e.g.'Frontend'
}, { timestamps: true });

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;