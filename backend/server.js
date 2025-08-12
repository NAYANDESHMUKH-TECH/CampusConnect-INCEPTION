const express = require('express');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CampusConnect API',
      version: '1.0.0',
      description: 'API documentation for CampusConnect backend (in-memory)'
    },
    servers: [
      { url: 'http://localhost:5000/api', description: 'Local server' }
    ]
  },
  apis: [path.join(__dirname, '/routes/*.js')]
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const eventsRoute = require('./routes/events');
app.use('/api/events', eventsRoute);

// Root
app.get('/', (req, res) => {
  res.send('CampusConnect Backend is running. See /api-docs for API documentation.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT} (API docs at http://localhost:${PORT}/api-docs)`));
