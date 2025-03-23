const { v4: uuidv4 } = require('uuid');
const Sprint = require('../../../domain/entities/Sprint');

class CreateSprintUseCase {
  constructor(sprintRepository, teamRepository, userTeamRepository) {
    this.sprintRepository = sprintRepository;
    this.teamRepository = teamRepository;
    this.userTeamRepository = userTeamRepository;
  }

  async execute(sprintData, userId) {
    // Check if the team exists
    const team = await this.teamRepository.findById(sprintData.teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    
    // Check if the user is a member of the team
    const userTeam = await this.userTeamRepository.findByUserAndTeam(userId, sprintData.teamId);
    if (!userTeam) {
      throw new Error('User is not a member of this team');
    }
    
    // Create the sprint
    const sprint = new Sprint(
      uuidv4(),
      sprintData.name,
      new Date(sprintData.startDate),
      new Date(sprintData.endDate),
      sprintData.teamId
    );
    
    return await this.sprintRepository.create(sprint);
  }
}

module.exports = CreateSprintUseCase; 