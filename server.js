const express = require('express');
const cors = require('cors');
const path = require('path');

// Load environment variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration for production
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://your-frontend-domain.vercel.app' // Update with your frontend domain
  ],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Import routes
const jobRoutes = require('./routes/jobs');
const userRoutes = require('./routes/users');
const applicationRoutes = require('./routes/applications');

// Use routes
app.use('/api/jobs', jobRoutes);
app.use('/api/users', userRoutes);
app.use('/api/applications', applicationRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Server is running', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Career Platform Backend API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      jobs: '/api/jobs',
      users: '/api/users',
      applications: '/api/applications',
      health: '/api/health'
    }
  });
});

// Export for Vercel
module.exports = app;

// Only listen locally, not in Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}