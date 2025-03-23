const express = require('express');
const auth = require('../../../adapters/middlewares/authMiddleware');
const { createTaskValidator, updateTaskStatusValidator } = require('../../../adapters/validators/taskValidators');
const validate = require('../../../adapters/middlewares/validationMiddleware');

module.exports = (taskController) => {
  const router = express.Router();

  // Create a new task
  router.post('/', auth, createTaskValidator, validate, (req, res) => taskController.createTask(req, res));

  // Update task status (for Kanban movement)
  router.patch('/:taskId/status', auth, updateTaskStatusValidator, validate, (req, res) => taskController.updateTaskStatus(req, res));

  // Get tasks by team
  router.get('/team/:teamId', auth, (req, res) => taskController.getTeamTasks(req, res));

  // Get tasks by team and status (Kanban columns)
  router.get('/team/:teamId/status/:status', auth, (req, res) => taskController.getTasksByStatus(req, res));

  // Get tasks by sprint
  router.get('/sprint/:sprintId', auth, (req, res) => taskController.getSprintTasks(req, res));

  // Get a task by ID
  router.get('/:taskId', auth, (req, res) => taskController.getTaskById(req, res));

  // Update a task
  router.put('/:taskId', auth, (req, res) => taskController.updateTask(req, res));

  // Delete a task
  router.delete('/:taskId', auth, (req, res) => taskController.deleteTask(req, res));

  return router;
}; 