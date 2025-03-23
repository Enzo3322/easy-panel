const express = require('express');
const auth = require('../../../adapters/middlewares/authMiddleware');
const { createTeamValidator, inviteUserValidator } = require('../../../adapters/validators/teamValidators');
const validate = require('../../../adapters/middlewares/validationMiddleware');

module.exports = (teamController) => {
  const router = express.Router();

  // Create a new team
  router.post('/', auth, createTeamValidator, validate, (req, res) => teamController.createTeam(req, res));

  // Get all teams the user is a member of
  router.get('/', auth, (req, res) => teamController.getUserTeams(req, res));

  // Get a team by ID
  router.get('/:teamId', auth, (req, res) => teamController.getTeamById(req, res));

  // Invite a user to a team
  router.post('/:teamId/invite', auth, inviteUserValidator, validate, (req, res) => teamController.inviteUser(req, res));

  return router;
}; 