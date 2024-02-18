const express = require('express');
const {
  rateLimitMiddleware, 
  ipRequestCounts
} = require('./rateLimitMiddleware');
const PORT =  3000;

const app = express();

app.use(rateLimitMiddleware);

app.get('/', (req, res) => {
  res.send(`Access Granted! Total Request: ${ipRequestCounts[req.ip]}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});