const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');
const app   = express();
const https = require('https');
const fs = require('fs');
const PORT = 3001;
const cron = require('./utils/cronJob');
const { generateDailyChallenge } = require('./controllers/challengeController');

dotenv.config();

app.use(express.json()); // parse incoming JSON data
const allowedOrigins = ['https://we-are-fit.vercel.app'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || (origin && origin.startsWith('http://localhost'))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
connectDB();

const authRoutes = require('./routes/authRoutes.js');
const progressRoutes = require('./routes/progressRoutes.js');
const friendRoutes = require('./routes/friendRoutes.js');
const challengeRoutes = require('./routes/challengeRoutes.js');
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/challenge', challengeRoutes);

app.get('/', (req, res) => {
    res.send('WeAreFit Backend API');
})

app.listen(PORT, async () => {
    console.log('Server is running on port ' + PORT);
    // await generateDailyChallenge(); // for testing purposes
})