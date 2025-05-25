// src/workers/logWorker.js
const mongoose = require('mongoose');
// const logQueue = require('../queue/logQueue');
const ApiLog    = require('../models/ApiLog');
const Queue = require('bull');


const logQueue = new Queue('api-logs', {
    redis: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }
  });
// Optional: graceful shutdown
function shutdown() {
  logQueue.close().then(() => process.exit(0));
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// src/server.js
const express    = require('express');

async function start() {
  // 1. Connect to MongoDB
  await mongoose.connect('mongodb+srv://sayman:sayman@cluster0.rl0sfdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

  const app = express();
  app.use(express.json());

// Process jobs from the queue
logQueue.process(async (job) => {
    console.log('request reiceved job',job)
  const data = job.data;
  // Save into Mongo
  await ApiLog.create(data);
});


  app.listen(3002, () => {
    console.log('API listening on port 3000');
  });
}

start().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
