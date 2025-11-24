// server/models/Command.js
const mongoose = require('mongoose');

const commandSchema = mongoose.Schema(
    {
        name: { type: String, required: true, unique: true } ,
        output: { type: String, required: true },
        description: { type: String, required: true },
        isCoreCommand: { type: Boolean, default: false },
        showInHeader: { type: Boolean, default: true },
    },
    {
        timestamps: true,
    }
);

const Command = mongoose.model('Command', commandSchema);

module.exports = Command;