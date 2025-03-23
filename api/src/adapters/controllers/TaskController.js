class TaskController {
  constructor(createTaskUseCase, updateTaskStatusUseCase, taskRepository) {
    this.createTaskUseCase = createTaskUseCase;
    this.updateTaskStatusUseCase = updateTaskStatusUseCase;
    this.taskRepository = taskRepository;
  }

  async createTask(req, res) {
    try {
      const taskData = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        assigneeId: req.body.assigneeId,
        sprintId: req.body.sprintId,
        teamId: req.body.teamId
      };
      
      const task = await this.createTaskUseCase.execute(taskData, req.user.id);
      
      return res.status(201).json(task);
    } catch (error) {
      if (
        error.message === 'Team not found' ||
        error.message === 'User is not a member of this team' ||
        error.message === 'Sprint not found' ||
        error.message === 'Sprint does not belong to the specified team'
      ) {
        return res.status(404).json({ message: error.message });
      }
      
      return res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  async updateTaskStatus(req, res) {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
      
      const task = await this.updateTaskStatusUseCase.execute(taskId, status, req.user.id);
      
      return res.status(200).json(task);
    } catch (error) {
      if (error.message === 'Task not found' || error.message === 'User is not a member of this task\'s team') {
        return res.status(404).json({ message: error.message });
      }
      
      if (error.message === 'Invalid status') {
        return res.status(400).json({ message: error.message });
      }
      
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTeamTasks(req, res) {
    try {
      const { teamId } = req.params;
      const tasks = await this.taskRepository.findByTeam(teamId);
      
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTasksByStatus(req, res) {
    try {
      const { teamId, status } = req.params;
      const tasks = await this.taskRepository.findByStatus(teamId, status);
      
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getSprintTasks(req, res) {
    try {
      const { sprintId } = req.params;
      const tasks = await this.taskRepository.findBySprint(sprintId);
      
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTaskById(req, res) {
    try {
      const { taskId } = req.params;
      const task = await this.taskRepository.findById(taskId);
      
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      return res.status(200).json(task);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateTask(req, res) {
    try {
      const { taskId } = req.params;
      const taskData = req.body;
      
      const task = await this.taskRepository.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      const updatedTask = await this.taskRepository.update(taskId, taskData);
      
      return res.status(200).json(updatedTask);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteTask(req, res) {
    try {
      const { taskId } = req.params;
      
      const task = await this.taskRepository.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      
      await this.taskRepository.delete(taskId);
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = TaskController; 