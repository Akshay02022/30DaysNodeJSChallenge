let cachedResponses = {};
/**
 * Caching middleware for Express
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
function cachingMiddleware(req, res, next) {
  const cacheKey = req.originalUrl || req.url;
  if (
    cachedResponses[cacheKey] &&
    cachedResponses[cacheKey].expirationTime > Date.now()
  ) {
    console.log(`Cached response found for ${cacheKey}`);
    res.send(cachedResponses[cacheKey].response);
  } else {
    console.log(`No cached response found for ${cacheKey}`);
    const originalSend = res.send;
    res.send = function (body) {
      cachedResponses[cacheKey] = {
        response: body,
        expirationTime: Date.now() + cacheExpirationTime,
      };
      originalSend.call(this, body);
    };

    next();
  }
}

const cacheExpirationTime = 3 * 1000; // 3 sec

module.exports = cachingMiddleware;
