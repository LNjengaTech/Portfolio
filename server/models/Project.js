//Project.js model
const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        terminalCommand: { type: String, required: true, unique: true }, //e.g., "titlename" for "project titlename"
        technologies: { type: [String] }, //aray of strings (comma-separated on frontend)
        liveUrl: { type: String },
        repoUrl: { type: String },

        //FIELDS FOR GUI
        detailedDescription: { type: String },
        imageUrl: { type: String },
        images: [{ type: String }],
        featured: { type: Boolean, default: false },
        category: { type: String, enum: ['Web', 'Mobile', 'Desktop', 'API', 'Other'], default: 'Web' },
        completionDate: { type: Date },
        demoVideo: { type: String }, //YouTube/Vimeo URL
        
        //additional metadata(LATER)
        githubStars: { type: Number, default: 0 },
        challenges: { type: String }, //Challenges faced during development
        learnings: { type: String }, //What you learned
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;