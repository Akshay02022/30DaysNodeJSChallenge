const express = require('express');
const app = express();
const port = 3000;
/**
 * Express route to handle requests with a positive integer parameter
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
*/
function positiveIntegerHandler(req, res) {
  const number = parseInt(req.query.number);
  
  if (Number.isInteger(number) && number > 0) {
    res.send('Success: Valid positive integer provided.');
  } else {
    throw new Error('Invalid positive integer. Please provide a positive integer.');
  }
}
function errorHandlerMiddleware(err, req, res, next) {
  console.error(err.message);
  res.status(400).send('Bad Request: ' + err.message);
} 
app.get('/positive', positiveIntegerHandler);
app.use(errorHandlerMiddleware);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
