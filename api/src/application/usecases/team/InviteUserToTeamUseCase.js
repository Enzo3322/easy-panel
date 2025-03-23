const { v4: uuidv4 } = require('uuid');
const UserTeam = require('../../../domain/entities/UserTeam');

class InviteUserToTeamUseCase {
  constructor(userRepository, teamRepository, userTeamRepository) {
    this.userRepository = userRepository;
    this.teamRepository = teamRepository;
    this.userTeamRepository = userTeamRepository;
  }

  async execute(teamId, userEmail, inviterId, role = 'member') {
    // Check if the inviter is the team admin
    const inviterMembership = await this.userTeamRepository.findByUserAndTeam(inviterId, teamId);
    if (!inviterMembership || inviterMembership.role !== 'admin') {
      throw new Error('Only team admins can invite users');
    }
    
    // Check if the team exists
    const team = await this.teamRepository.findById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    
    // Find the user by email
    const user = await this.userRepository.findByEmail(userEmail);
    if (!user) {
      throw new Error('User not found');
    }
    
    // Check if the user is already a member
    const existingMembership = await this.userTeamRepository.findByUserAndTeam(user.id, teamId);
    if (existingMembership) {
      throw new Error('User is already a member of this team');
    }
    
    // Create the user-team relationship
    const userTeam = new UserTeam(
      uuidv4(),
      user.id,
      teamId,
      role
    );
    
    return await this.userTeamRepository.create(userTeam);
  }
}

module.exports = InviteUserToTeamUseCase; 