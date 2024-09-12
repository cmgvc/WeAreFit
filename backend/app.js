const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const cors = require('cors');
const app   = express();
const port = process.env.PORT || 3000;

dotenv.config();

app.use(express.json()); // parse incoming JSON data
app.use(cors());   

connectDB();

const authRoutes = require('./routes/authRoutes.js');
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('WeAreFit Backend API');
})

app.listen(port, () => {
    console.log('Server is running on port ' + port);
})