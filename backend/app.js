const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');
const app   = express();
const port = process.env.PORT || 8080;
const { generateDailyChallenge } = require('./controllers/challengeController');

dotenv.config();

app.use(express.json()); // parse incoming JSON data
app.use(cors());   

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

app.listen(port, async () => {
    console.log('Server is running on port ' + port);
    // await generateDailyChallenge(); // this is for testing purposes
})