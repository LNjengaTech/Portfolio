// server/models/Project.js
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        terminalCommand: { type: String, required: true, unique: true }, // e.g., "titlename" for "project titlename"
        technologies: { type: [String] }, // Array of strings (comma-separated on frontend)
        liveUrl: { type: String },
        repoUrl: { type: String },
        // Later: imageUrl: { type: String },
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;