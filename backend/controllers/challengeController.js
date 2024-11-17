const Challenge = require('../models/Challenge');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
dotenv.config();

const fetchDailyChallenge = async (req, res) => {
    const today = new Date();
    const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1));

    const challenges = await Challenge.find({
        date: { $gte: startOfDay, $lt: endOfDay }
    });

    if (challenges.length > 0) {
        res.json(challenges);
    } else {
        res.status(404).send('No challenges found for today.');
    }
};

const getRandomWorkoutFromFile = async (file) => {
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

const generateDailyChallenge = async () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const beginnerPrompt = "Generate a one-sentence workout for beginners.";
        const intermediatePrompt = "Generate a one-sentence workout for intermediate users.";
        const advancedPrompt = "Generate a one-sentence workout for advanced users.";

        const beginnerResult = await model.generateContent(beginnerPrompt);
        const intermediateResult = await model.generateContent(intermediatePrompt);
        const advancedResult = await model.generateContent(advancedPrompt);

        const workoutEntry = new Challenge({
            date: today,
            beginnerWorkout: beginnerResult.response.text(),
            intermediateWorkout: intermediateResult.response.text(),
            advancedWorkout: advancedResult.response.text()
        });

        await workoutEntry.save(); 
        console.log('Daily challenge generated successfully.', workoutEntry);
    } catch (error) {
        console.error('Error saving the workout entry:', error);
    }
};

module.exports = {
    fetchDailyChallenge,
    getRandomWorkoutFromFile,
    generateDailyChallenge
};
