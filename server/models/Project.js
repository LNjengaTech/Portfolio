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


//===========================================================================================
        //fields for GUI
//=========================================================================================        
        detailedDescription: { type: String }, // Full description for GUI detail view
        imageUrl: { type: String }, // Main project screenshot/image
        images: [{ type: String }], // Multiple images for gallery
        featured: { type: Boolean, default: false }, // Highlight on homepage
        category: { type: String, enum: ['Web', 'Mobile', 'Desktop', 'API', 'Other'], default: 'Web' },
        completionDate: { type: Date },
        demoVideo: { type: String }, // YouTube/Vimeo URL
        
        //additional metadata
        githubStars: { type: Number, default: 0 },
        challenges: { type: String }, // Challenges faced during development
        learnings: { type: String }, // What you learned
    },
    {
        timestamps: true,
    }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;