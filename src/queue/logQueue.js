// src/queues/logQueue.js
const Queue = require('bull');
const logQueue = new Queue('api-logs', {
  redis: { host: process.env.REDIS_HOST, port: process.env.REDIS_PORT }
});

// Optional: handle global queue events
logQueue.on('failed', (job, err) => {
  console.error(`Log job ${job.id} failed:`, err);
});

module.exports = logQueue;
