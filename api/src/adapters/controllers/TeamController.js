class TeamController {
  constructor(createTeamUseCase, inviteUserToTeamUseCase, teamRepository) {
    this.createTeamUseCase = createTeamUseCase;
    this.inviteUserToTeamUseCase = inviteUserToTeamUseCase;
    this.teamRepository = teamRepository;
  }

  async createTeam(req, res) {
    try {
      const teamData = {
        name: req.body.name
      };
      
      const team = await this.createTeamUseCase.execute(teamData, req.user.id);
      
      return res.status(201).json(team);
    } catch (error) {
      return res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  async inviteUser(req, res) {
    try {
      const { teamId } = req.params;
      const { email, role } = req.body;
      
      const userTeam = await this.inviteUserToTeamUseCase.execute(teamId, email, req.user.id, role);
      
      return res.status(201).json(userTeam);
    } catch (error) {
      if (
        error.message === 'Team not found' ||
        error.message === 'User not found' ||
        error.message === 'User is already a member of this team'
      ) {
        return res.status(404).json({ message: error.message });
      }
      
      if (error.message === 'Only team admins can invite users') {
        return res.status(403).json({ message: error.message });
      }
      
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUserTeams(req, res) {
    try {
      const teams = await this.teamRepository.findUserTeams(req.user.id);
      return res.status(200).json(teams);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTeamById(req, res) {
    try {
      const { teamId } = req.params;
      const team = await this.teamRepository.findById(teamId);
      
      if (!team) {
        return res.status(404).json({ message: 'Team not found' });
      }
      
      return res.status(200).json(team);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = TeamController; 