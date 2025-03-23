const express = require('express');
const { registerValidator, loginValidator } = require('../../../adapters/validators/userValidators');
const validate = require('../../../adapters/middlewares/validationMiddleware');

module.exports = (userController) => {
  const router = express.Router();

  // Register a new user
  router.post('/register', registerValidator, validate, (req, res) => userController.register(req, res));

  // Login
  router.post('/login', loginValidator, validate, (req, res) => userController.login(req, res));

  return router;
}; 