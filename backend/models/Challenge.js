const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true },
    beginnerWorkout: { type: String, required: true },
    intermediateWorkout: { type: String, required: true },
    advancedWorkout: { type: String, required: true }   
})

module.exports = mongoose.model('Challenge', challengeSchema);