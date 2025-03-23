const { v4: uuidv4 } = require('uuid');
const Team = require('../../../domain/entities/Team');
const UserTeam = require('../../../domain/entities/UserTeam');

class CreateTeamUseCase {
  constructor(teamRepository, userTeamRepository) {
    this.teamRepository = teamRepository;
    this.userTeamRepository = userTeamRepository;
  }

  async execute(teamData, creatorId) {
    const team = new Team(
      uuidv4(),
      teamData.name,
      creatorId
    );
    
    const createdTeam = await this.teamRepository.create(team);
    
    // Add creator as admin to the team
    const userTeam = new UserTeam(
      uuidv4(),
      creatorId,
      createdTeam.id,
      'admin'
    );
    
    await this.userTeamRepository.create(userTeam);
    
    return createdTeam;
  }
}

module.exports = CreateTeamUseCase; 