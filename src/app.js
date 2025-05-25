// src/server.js
const express    = require('express');
const mongoose   = require('mongoose');
const logMiddleware = require('./middleware/logMiddleware');
const apiRouter  = require('./routes/index'); // your routes

async function start() {
  // 1. Connect to MongoDB
  await mongoose.connect('mongodb+srv://sayman:sayman@cluster0.rl0sfdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  const app = express();
  app.use(express.json());

  // 2. Use the logging middleware _early_ so it wraps all routes
  app.use(logMiddleware);

  // 3. Your application routes
  app.use('/api', apiRouter);

  app.listen(3000, () => {
    console.log('API listening on port 3000');
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
