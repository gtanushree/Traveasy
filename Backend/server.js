const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const trafficRoutes = require('./routes/traffic');
const routingRoutes = require('./routes/routing');
const Ai = require('./routes/ai');
const { logRequest, logError } = require('./utils/logger'); // Custom logger utility
const rateLimit = require('express-rate-limit'); // Rate limiting for API protection

const app = express();
const port = process.env.PORT || 3000;

// Rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(logRequest); // Log all incoming requests
app.use(limiter); // Apply rate limiting to all routes

// Routes
app.use('/traffic', trafficRoutes); // Traffic-related routes
app.use('/routing', routingRoutes); // Routing-related routes
app.use('/ai' , Ai); // AI-related routes

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  logError(err); // Log the error
  console.log(err);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});