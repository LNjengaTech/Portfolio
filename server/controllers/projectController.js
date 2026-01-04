const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

//===========PUBLIC ROUTES(for the user layout terminal)=====

// @desc    Fetch all projects - with optional filters(used for 'projects' command)
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
    try {
        const { featured, category, limit } = req.query;
        
        let query = {};
        
        if (featured === 'true') {
            query.featured = true;
        }
        
        if (category) {
            query.category = category;
        }
        
        let projectsQuery = Project.find(query).sort({ createdAt: -1 });
        
        if (limit) {
            projectsQuery = projectsQuery.limit(parseInt(limit));
        }
        
        const projects = await projectsQuery;
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Fetching a single project by its terminalCommand(used for 'project <cmd>' command - CLI only)
// @route   GET /api/projects/:command
// @access  Public
const getProjectByCommand = async (req, res) => {
    try {
        const project = await Project.findOne({ 
            terminalCommand: req.params.command.toLowerCase() 
        });
        
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//=================for GUI=================//
// @desc    Get single project by ID
// @route   GET /api/projects/id/:id
// @access  Public
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//=======ADMIN PROTECTED ROUTES - ive updated to accomodate the GUI

// @desc    Create a new project
// @route   POST /api/projects
// @access  Private/Admin
const createProject = asyncHandler(async (req, res) => {
    const { 
        title,
        description,
        detailedDescription,//addition
        terminalCommand,
        technologies,
        liveUrl,
        repoUrl,
        //===aditions====
        imageUrl,
        images,
        featured,
        category,
        completionDate,
        demoVideo,
    } = req.body;

    //this technologies field is an array of strings in the model, but sent as a comma-separated string from the form.
    const techArray = Array.isArray(technologies) 
        ? technologies 
        : (technologies || '') // <-- The key fix: treat null/undefined/falsey as empty string
            .split(',')
            .map(tech => tech.trim())
            .filter(tech => tech.length > 0);
    
    //check if a project with the same terminal command already exists
    const projectExists = await Project.findOne({ terminalCommand });

    if (projectExists) {
        res.status(400);
        throw new Error(`Project command '${terminalCommand}' already in use.`);
    }

    const project = new Project({
            title,
            description,
            detailedDescription,
            terminalCommand: terminalCommand.toLowerCase(),
            technologies: Array.isArray(technologies) ? technologies : technologies.split(',').map(t => t.trim()),
            liveUrl,
            repoUrl,
            imageUrl,
            images: Array.isArray(images) ? images : (images ? images.split(',').map(i => i.trim()) : []),
            featured: featured || false,
            category,
            completionDate,
            demoVideo,
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
        //normalize technologies input
        const techArray = technologies ? technologies.split(',').map(tech => tech.trim()): [];
            
        project.title = title || project.title;
        project.description = description || project.description;
        project.detailedDescription = req.body.detailedDescription || project.detailedDescription;//addition
        project.terminalCommand = terminalCommand || project.terminalCommand;
        project.technologies = techArray; //Update the whole array
        project.liveUrl = liveUrl || project.liveUrl;
        project.repoUrl = repoUrl || project.repoUrl;

        //===additions====
        project.imageUrl = req.body.imageUrl || project.imageUrl;
        project.images = req.body.images || project.images;
        project.featured = req.body.featured !== undefined ? req.body.featured : project.featured;
        project.category = req.body.category || project.category;
        project.completionDate = req.body.completionDate || project.completionDate;
        project.demoVideo = req.body.demoVideo || project.demoVideo;

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


// @desc    Upload project image to Cloudinary
// @route   POST /api/projects/upload
// @access  Private/Admin
const uploadProjectImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log('File uploaded to Cloudinary:', req.file.path);
        
        //Multer-storage-cloudinary adds the 'path' property to the file object which contains the Cloudinary URL.
        res.json({
            message: 'Image uploaded successfully',
            imageUrl: req.file.path, 
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getProjects,
    getProjectByCommand,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    uploadProjectImage,
};

//====================================================
//Alternative way: upload controller to use Cloudinary - ill keep this commented out for now
//======================================================

/*
const cloudinary = require('../config/cloudinary');

const uploadProjectImage = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'portfolio/projects',
        });
        
        res.json({
            message: 'Image uploaded successfully',
            imageUrl: result.secure_url,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

*/
