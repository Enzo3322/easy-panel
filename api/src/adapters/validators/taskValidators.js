const { body } = require('express-validator');

const createTaskValidator = [
  body('title')
    .notEmpty()
    .withMessage('Task title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Task title must be between 3 and 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Task description is required'),
  body('status')
    .optional()
    .isIn(['TO_DO', 'IN_PROGRESS', 'DONE'])
    .withMessage('Status must be one of: TO_DO, IN_PROGRESS, DONE'),
  body('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid date'),
  body('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid date')
    .custom((value, { req }) => {
      if (req.body.startDate && new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  body('teamId')
    .notEmpty()
    .withMessage('Team ID is required'),
  body('sprintId')
    .optional(),
  body('assigneeId')
    .optional()
];

const updateTaskStatusValidator = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['TO_DO', 'IN_PROGRESS', 'DONE'])
    .withMessage('Status must be one of: TO_DO, IN_PROGRESS, DONE')
];

module.exports = {
  createTaskValidator,
  updateTaskStatusValidator
}; 