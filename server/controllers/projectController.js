// server/controllers/projectController.js
const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// --- PUBLIC ROUTES (for the user layout terminal) ---

// @desc    Fetch all projects (used for 'projects' command)
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({});
    res.json(projects);
});

// @desc    Fetch a single project by its terminalCommand (used for 'project <cmd>' command)
// @route   GET /api/projects/:command
// @access  Public
const getProjectByCommand = asyncHandler(async (req, res) => {
    // Find project by the unique terminalCommand field
    const project = await Project.findOne({ terminalCommand: req.params.command });

    if (project) {
        res.json(project);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});


// --- ADMIN PROTECTED ROUTES (for the admin layout) ---

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
    const { title, description, terminalCommand, technologies, liveUrl, repoUrl } = req.body;

    // The technologies field is an array of strings in the model, 
    // but often sent as a comma-separated string from a form.
    // Let's normalize it here.
    const techArray = technologies 
        ? technologies.split(',').map(tech => tech.trim())
        : [];
    
    // Check if a project with the same terminal command already exists
    const projectExists = await Project.findOne({ terminalCommand });

    if (projectExists) {
        res.status(400);
        throw new Error(`Project command '${terminalCommand}' already in use.`);
    }

    const project = new Project({
        title,
        description,
        terminalCommand,
        technologies: techArray,
        liveUrl,
        repoUrl,
    });

    const createdProject = await project.save();
    res.status(201).json(createdProject);
});

// @desc    Update an existing project
// @route   PUT /api/projects/:id
// @access  Private/Admin
const updateProject = asyncHandler(async (req, res) => {
    const { title, description, terminalCommand, technologies, liveUrl, repoUrl } = req.body;
    
    const project = await Project.findById(req.params.id);

    if (project) {
        // Normalize technologies input
        const techArray = technologies 
            ? technologies.split(',').map(tech => tech.trim())
            : [];
            
        project.title = title || project.title;
        project.description = description || project.description;
        project.terminalCommand = terminalCommand || project.terminalCommand;
        project.technologies = techArray; // Update the whole array
        project.liveUrl = liveUrl || project.liveUrl;
        project.repoUrl = repoUrl || project.repoUrl;

        const updatedProject = await project.save();
        res.json(updatedProject);
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private/Admin
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (project) {
        await Project.deleteOne({ _id: project._id });
        res.json({ message: 'Project removed' });
    } else {
        res.status(404);
        throw new Error('Project not found');
    }
});

module.exports = {
    getProjects,
    getProjectByCommand,
    createProject,
    updateProject,
    deleteProject,
};