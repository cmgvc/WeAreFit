const Challenge = require('../models/Challenge');
const fs = require('fs').promises;
const path = require('path');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require('axios');
const { cosineSimilarity } = require('cosine-similarity');
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

const fetchPastChallenges = async (req, res) => {
    try {
        const challenges = await Challenge.find();

        if (challenges.length > 0) {
            res.json(challenges); 
        } else {
            res.status(404).send('No challenges found.');
        }
    } catch (error) {
        console.error('Error fetching challenges:', error);
        res.status(500).send('Server error');
    }
}


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

const HUGGINGFACE_API_URL = 'https://api-inference.huggingface.co/models/sentence-transformers/all-MiniLM-L6-v2';

const getEmbedding = async (sentence) => {
    try {
      const response = await axios.post(
        HUGGINGFACE_API_URL,
        { inputs: sentence },
        { headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}` } }
      );
      return response.data[0].embedding;  // Embedding vector from Hugging Face response
    } catch (error) {
      console.error('Error getting sentence embedding:', error);
      return null;
    }
  };
  
  // Function to check semantic similarity
  const checkSemanticSimilarity = async (newWorkout, existingWorkouts) => {
    const newWorkoutEmbedding = await getEmbedding(newWorkout);
  
    for (let existingWorkout of existingWorkouts) {
      const existingEmbedding = await getEmbedding(existingWorkout.workoutText);  // Assuming 'workoutText' is the text field
  
      if (newWorkoutEmbedding && existingEmbedding) {
        const similarity = cosineSimilarity(newWorkoutEmbedding, existingEmbedding);
        if (similarity > 0.8) {  // Similarity threshold (0 to 1)
          return true;  // Workouts are too similar
        }
      }
    }
    return false;  // Workouts are unique
  };

const generateDailyChallenge = async () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        let isUnique = false;
        let workoutEntry;

        const existingChallenges = await Challenge.find();

        while (!isUnique) {
            const beginnerPrompt = "Generate a one-sentence workout for beginners.";
            const intermediatePrompt = "Generate a one-sentence workout for intermediate users.";
            const advancedPrompt = "Generate a one-sentence workout for advanced users.";

            const beginnerResult = await model.generateContent(beginnerPrompt);
            const intermediateResult = await model.generateContent(intermediatePrompt);
            const advancedResult = await model.generateContent(advancedPrompt);

            const beginnerWorkout = beginnerResult.response.text();
            const intermediateWorkout = intermediateResult.response.text();
            const advancedWorkout = advancedResult.response.text();

            console.log('Generated workouts:', beginnerWorkout, intermediateWorkout, advancedWorkout);

            const beginnerSimilar = await checkSemanticSimilarity(beginnerWorkout, existingChallenges);
            const intermediateSimilar = await checkSemanticSimilarity(intermediateWorkout, existingChallenges);
            const advancedSimilar = await checkSemanticSimilarity(advancedWorkout, existingChallenges);

            if (!beginnerSimilar && !intermediateSimilar && !advancedSimilar) {
                workoutEntry = new Challenge({
                    date: today,
                    beginnerWorkout,
                    intermediateWorkout,
                    advancedWorkout
                });
                isUnique = true;
            } else {
                console.log('Generated challenge already exists. Generating a new one...');
            }
        }

        await workoutEntry.save();
        console.log('Daily challenge generated successfully:', workoutEntry);
    } catch (error) {
        console.error('Error saving the workout entry:', error);
    }
};

module.exports = {
    fetchDailyChallenge,
    fetchPastChallenges,
    getRandomWorkoutFromFile,
    generateDailyChallenge
};
