const ipRequestCounts = {};

/**
 * Rate-limiting middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function rateLimitMiddleware(req, res, next) {
  const rateLimit = 5;
  const ip = req.ip;
  const requestCount = ipRequestCounts[ip] || 0;

  if (requestCount >= rateLimit) {
    res.status(429).send('Too Many Requests');
    return;
  }

  ipRequestCounts[ip] = requestCount + 1;
  next();
}
module.exports = {
  rateLimitMiddleware, 
  ipRequestCounts
};