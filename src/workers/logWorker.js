// src/workers/logWorker.js
const mongoose = require('mongoose');
const logQueue = require('../queue/logQueue');
const ApiLog    = require('../models/ApiLog');


// ensure Mongo is connected in this process
mongoose.connect('mongodb+srv://sayman:sayman@cluster0.rl0sfdh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {

});

// Process jobs from the queue
logQueue.process(async (job) => {
    console.log('request reiceved job',job)
  const data = job.data;
  // Save into Mongo
  await ApiLog.create(data);
});

// Optional: graceful shutdown
function shutdown() {
  logQueue.close().then(() => process.exit(0));
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
