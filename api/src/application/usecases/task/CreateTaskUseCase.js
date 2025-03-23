const { v4: uuidv4 } = require('uuid');
const Task = require('../../../domain/entities/Task');

class CreateTaskUseCase {
  constructor(taskRepository, teamRepository, userTeamRepository, sprintRepository) {
    this.taskRepository = taskRepository;
    this.teamRepository = teamRepository;
    this.userTeamRepository = userTeamRepository;
    this.sprintRepository = sprintRepository;
  }

  async execute(taskData, userId) {
    // Check if the team exists
    const team = await this.teamRepository.findById(taskData.teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    
    // Check if the user is a member of the team
    const userTeam = await this.userTeamRepository.findByUserAndTeam(userId, taskData.teamId);
    if (!userTeam) {
      throw new Error('User is not a member of this team');
    }
    
    // If sprint is provided, check if it exists and belongs to the team
    if (taskData.sprintId) {
      const sprint = await this.sprintRepository.findById(taskData.sprintId);
      if (!sprint) {
        throw new Error('Sprint not found');
      }
      
      if (sprint.teamId !== taskData.teamId) {
        throw new Error('Sprint does not belong to the specified team');
      }
    }
    
    // Create the task
    const task = new Task(
      uuidv4(),
      taskData.title,
      taskData.description,
      taskData.status || 'TO_DO',
      taskData.startDate ? new Date(taskData.startDate) : null,
      taskData.endDate ? new Date(taskData.endDate) : null,
      taskData.assigneeId,
      taskData.sprintId,
      taskData.teamId
    );
    
    return await this.taskRepository.create(task);
  }
}

module.exports = CreateTaskUseCase; 