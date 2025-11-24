// server/controllers/commandController.js
const asyncHandler = require('express-async-handler');
const Command = require('../models/Command');

// --- PUBLIC ROUTES (for the user layout terminal) ---

// @desc    Fetch all commands (for the terminal header and general list)
// @route   GET /api/commands
// @access  Public
const getCommands = asyncHandler(async (req, res) => {
    // Only return commands marked to be shown in the header, or all if we decide to list them
    const commands = await Command.find({});
    res.json(commands);
});

// @desc    Fetch a single command's output by its name
// @route   GET /api/commands/:name
// @access  Public
const getCommandByName = asyncHandler(async (req, res) => {
    // Command names are case-insensitive in a CLI, so we should convert it.
    const commandName = req.params.name.toLowerCase();
    
    const command = await Command.findOne({ name: commandName });

    if (command) {
        res.json(command);
    } else {
        res.status(404);
        // We throw an error here, but the frontend will handle this gracefully 
        // by showing a 'command not found' message.
        throw new Error(`Command not found: ${req.params.name}`);
    }
});


// --- ADMIN PROTECTED ROUTES (for the admin layout) ---

// @desc    Create a new command
// @route   POST /api/commands
// @access  Private/Admin
const createCommand = asyncHandler(async (req, res) => {
    const { name, output, description, isCoreCommand, showInHeader } = req.body;

    // POTENTIAL OMISSION FIX: Input validation
    if (!name || !output || !description) {
        res.status(400);
        throw new Error('Please include all required fields: name, output, and description.');
    }
    
    // Normalize command name to lowercase for consistency
    const normalizedName = name.toLowerCase();

    // Check if command already exists
    const commandExists = await Command.findOne({ name: normalizedName });

    if (commandExists) {
        res.status(400);
        throw new Error(`Command '${name}' already exists.`);
    }

    const command = new Command({
        name: normalizedName,
        output,
        description,
        isCoreCommand: isCoreCommand || false,
        showInHeader: showInHeader !== undefined ? showInHeader : true,
    });

    const createdCommand = await command.save();
    res.status(201).json(createdCommand);
});

// @desc    Update an existing command
// @route   PUT /api/commands/:id
// @access  Private/Admin
const updateCommand = asyncHandler(async (req, res) => {
    const { name, output, description, isCoreCommand, showInHeader } = req.body;
    
    const command = await Command.findById(req.params.id);

    if (command) {
        // Only update the name if it's different and not a core command
        if (name && name !== command.name && !command.isCoreCommand) {
             // Check if the new name is already taken by another command
            const nameConflict = await Command.findOne({ name: name.toLowerCase() });
            if (nameConflict && nameConflict._id.toString() !== req.params.id) {
                res.status(400);
                throw new Error(`Command name '${name}' is already in use.`);
            }
            command.name = name.toLowerCase();
        }
        
        command.output = output !== undefined ? output : command.output;
        command.description = description !== undefined ? description : command.description;
        // isCoreCommand can only be set during creation or by advanced admin logic
        // I'll allow updating showInHeader for now
        command.showInHeader = showInHeader !== undefined ? showInHeader : command.showInHeader;
        
        const updatedCommand = await command.save();
        res.json(updatedCommand);
    } else {
        res.status(404);
        throw new Error('Command not found');
    }
});

// @desc    Delete a command
// @route   DELETE /api/commands/:id
// @access  Private/Admin
const deleteCommand = asyncHandler(async (req, res) => {
    const command = await Command.findById(req.params.id);

    if (command) {
        // Prevent accidental deletion of core commands like 'help' or 'clear'
        if (command.isCoreCommand) {
            res.status(403);
            throw new Error('Cannot delete a core command.');
        }

        await Command.deleteOne({ _id: command._id });
        res.json({ message: 'Command removed' });
    } else {
        res.status(404);
        throw new Error('Command not found');
    }
});

module.exports = {
    getCommands,
    getCommandByName,
    createCommand,
    updateCommand,
    deleteCommand,
};