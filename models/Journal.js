const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema({
    entry: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Journal', JournalSchema);