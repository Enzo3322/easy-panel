const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('../config/swagger');
const setupDependencies = require('../config/dependencies');

const createApp = () => {
  const app = express();
  
  // Middleware
  app.use(cors());
  app.use(express.json());
  
  // Swagger documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
  
  // Routes
  const { userRouter, teamRouter, sprintRouter, taskRouter } = setupDependencies();
  
  app.use('/api/users', userRouter);
  app.use('/api/teams', teamRouter);
  app.use('/api/sprints', sprintRouter);
  app.use('/api/tasks', taskRouter);
  
  // Health check route
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
  });
  
  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Something went wrong',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  });
  
  return app;
};

module.exports = createApp; 