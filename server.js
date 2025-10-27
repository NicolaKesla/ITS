require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./backend/config/database');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./backend/routes/auth'));
app.use('/api/internships', require('./backend/routes/internships'));
app.use('/api/applications', require('./backend/routes/applications'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ITS API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
