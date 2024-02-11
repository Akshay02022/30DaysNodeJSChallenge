const express = require('express');
const authMiddleware = require('./authmiddleware'); 
const app = express();
const port = 3000;

app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', data: req.data });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
