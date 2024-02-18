/**
 * Logging middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function loggingMiddleware(req, res, next) {
  let timestamp = new Date().toISOString();
  console.log(`[${timestamp}]`, req.method);
  console.log(`URL :`, req.url);
  console.log(`Header : `, req.headers);
  console.log(`Body: `, req.body);
  next();
}
module.exports = loggingMiddleware;
