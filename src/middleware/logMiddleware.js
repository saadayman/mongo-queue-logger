// src/middleware/logMiddleware.js
const logQueue = require('../queue/logQueue');

module.exports = function logMiddleware(req, res, next) {
  const start = Date.now();

  // wait until response finishes
  res.on('finish', () => {
    const responseTime = Date.now() - start;

    const logEntry = {
      method:       req.method,
      path:         req.originalUrl,
      statusCode:   res.statusCode,
      responseTime,
      meta: {
        ip:        req.ip,
        userAgent: req.get('User-Agent'),
        // attach more context here if needed
      }
    };

    // enqueue the job (fire-and-forget)
    logQueue.add(logEntry, {
      attempts:  3,            // retry up to 3 times
      backoff:   { type: 'fixed', delay: 5000 },
      removeOnComplete: true,  // auto‐remove succeeded jobs
      removeOnFail:     false
    });
  });

  next();
};
