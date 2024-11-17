const Challenge = require('../models/Challenge');
const fs = require('fs').promises;
const path = require('path');

exports.fetchDailyChallenge = async (req, res) => {
    const today = new Date();
    const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1));

    const challenges = await Challenge.find({
        date: { $gte: startOfDay, $lt: endOfDay }
    });
    console.log(challenges);
    console.log(startOfDay);
    console.log(endOfDay);

    if (challenges.length > 0) {
        res.json(challenges);
    } else {
        res.status(404).send('No challenges found for today.');
    }
};

exports.getRandomWorkoutFromFile = async (file) => {
    try {
        const data = await fs.readFile(file, 'utf8');
        const workouts = data.split('\n').map(line => line.trim()).filter(line => line);
        const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];
        return randomWorkout;
    } catch (error) {
        console.error(`Error reading the file at ${file}:`, error);
        return null;
    }
};

exports.generateDailyChallenge = async () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0); 
    const beginnerFile = path.join(__dirname, '..', 'assets', 'beginner.txt');
    const intermediateFile = path.join(__dirname, '..', 'assets', 'intermediate.txt');
    const advancedFile = path.join(__dirname, '..', 'assets', 'advanced.txt');

    const randomBeginner = await exports.getRandomWorkoutFromFile(beginnerFile);
    const randomIntermediate = await exports.getRandomWorkoutFromFile(intermediateFile);
    const randomAdvanced = await exports.getRandomWorkoutFromFile(advancedFile);

    const workoutEntry = new Challenge({
        date: today,
        beginnerWorkout: randomBeginner,
        intermediateWorkout: randomIntermediate,
        advancedWorkout: randomAdvanced
    });

    try {
        await workoutEntry.save(); 
        console.log('Daily challenge generated successfully.', workoutEntry);
    } catch (error) {
        console.error('Error saving the workout entry:', error);
    }
};