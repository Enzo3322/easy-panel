const { body } = require('express-validator');

const createSprintValidator = [
  body('name')
    .notEmpty()
    .withMessage('Sprint name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Sprint name must be between 3 and 100 characters'),
  body('startDate')
    .notEmpty()
    .withMessage('Start date is required')
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .notEmpty()
    .withMessage('End date is required')
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('teamId')
    .notEmpty()
    .withMessage('Team ID is required')
];

module.exports = {
  createSprintValidator
}; 