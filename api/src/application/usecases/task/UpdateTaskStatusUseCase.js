class UpdateTaskStatusUseCase {
  constructor(taskRepository, userTeamRepository) {
    this.taskRepository = taskRepository;
    this.userTeamRepository = userTeamRepository;
  }

  async execute(taskId, status, userId) {
    // Check if the task exists
    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    
    // Check if the user is a member of the team
    const userTeam = await this.userTeamRepository.findByUserAndTeam(userId, task.teamId);
    if (!userTeam) {
      throw new Error('User is not a member of this task\'s team');
    }
    
    // Validate the status
    const validStatuses = ['TO_DO', 'IN_PROGRESS', 'DONE'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }
    
    return await this.taskRepository.updateStatus(taskId, status);
  }
}

module.exports = UpdateTaskStatusUseCase; 