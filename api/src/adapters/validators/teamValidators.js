const { body } = require('express-validator');

const createTeamValidator = [
  body('name')
    .notEmpty()
    .withMessage('Team name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Team name must be between 3 and 100 characters')
];

const inviteUserValidator = [
  body('email')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('role')
    .optional()
    .isIn(['admin', 'member'])
    .withMessage('Role must be either "admin" or "member"')
];

module.exports = {
  createTeamValidator,
  inviteUserValidator
}; 