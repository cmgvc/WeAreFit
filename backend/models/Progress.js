const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    taskId: { type: String, required: true },
    dateCompleted: { type: Date, default: Date.now },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true }
});

module.exports = mongoose.model('Progress', progressSchema);