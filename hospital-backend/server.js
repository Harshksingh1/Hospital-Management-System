require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));


// Default route
app.get('/', (req, res) => {
    res.send('Hospital Management System API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
const hospitalRoutes = require('./routes/hospitalRoutes');
app.use('/api/v1/hospitals', hospitalRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
