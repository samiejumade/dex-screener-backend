//server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

require('dotenv').config();

// Middleware to parse JSON requests
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const swapRoutes = require('./routes/swapRoutes');

app.use('/api/auth', authRoutes);
app.use('/api', swapRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
