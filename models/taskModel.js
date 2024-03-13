const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A task must have a title']
    },
    description: {
        type: String,
        required: [true, 'A task must have a description']
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'A task must belong to a user']
    }
});

module.exports = mongoose.model('Task', taskSchema);