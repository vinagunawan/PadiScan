const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const predictionRoutes = require('./routes/prediction');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/prediction', predictionRoutes);

// Start Server
app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});
