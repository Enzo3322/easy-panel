const express = require('express');
const auth = require('../../../adapters/middlewares/authMiddleware');
const { createSprintValidator } = require('../../../adapters/validators/sprintValidators');
const validate = require('../../../adapters/middlewares/validationMiddleware');

module.exports = (sprintController) => {
  const router = express.Router();

  // Create a new sprint
  router.post('/', auth, createSprintValidator, validate, (req, res) => sprintController.createSprint(req, res));

  // Get sprints by team
  router.get('/team/:teamId', auth, (req, res) => sprintController.getTeamSprints(req, res));

  // Get a sprint by ID
  router.get('/:sprintId', auth, (req, res) => sprintController.getSprintById(req, res));

  // Update a sprint
  router.put('/:sprintId', auth, (req, res) => sprintController.updateSprint(req, res));

  // Delete a sprint
  router.delete('/:sprintId', auth, (req, res) => sprintController.deleteSprint(req, res));

  return router;
}; 