const functions = require("firebase-functions");
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS
const todoRoutes = require('./routes/todoRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

// Enable CORS
app.use(cors()); // Use CORS middleware

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Use the todo routes
app.use('/api', todoRoutes);

// Root route to verify the server is running
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

exports.app = functions.https.onRequest(app)
