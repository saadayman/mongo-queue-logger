// src/models/ApiLog.js
const mongoose = require('mongoose');

const ApiLogSchema = new mongoose.Schema({
  method:      { type: String, required: true },
  path:        { type: String, required: true },
  statusCode:  { type: Number, required: true },
  responseTime:{ type: Number, required: true }, // in ms
  timestamp:   { type: Date,   default: Date.now },
  meta:        { type: Object }                  // any extra info (user, headers…)
});

module.exports = mongoose.model('ApiLog', ApiLogSchema);
