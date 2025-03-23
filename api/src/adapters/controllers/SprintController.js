class SprintController {
  constructor(createSprintUseCase, sprintRepository) {
    this.createSprintUseCase = createSprintUseCase;
    this.sprintRepository = sprintRepository;
  }

  async createSprint(req, res) {
    try {
      const sprintData = {
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        teamId: req.body.teamId
      };
      
      const sprint = await this.createSprintUseCase.execute(sprintData, req.user.id);
      
      return res.status(201).json(sprint);
    } catch (error) {
      if (error.message === 'Team not found' || error.message === 'User is not a member of this team') {
        return res.status(404).json({ message: error.message });
      }
      
      return res.status(500).json({ message: error.message || 'Internal server error' });
    }
  }

  async getTeamSprints(req, res) {
    try {
      const { teamId } = req.params;
      const sprints = await this.sprintRepository.findByTeam(teamId);
      
      return res.status(200).json(sprints);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getSprintById(req, res) {
    try {
      const { sprintId } = req.params;
      const sprint = await this.sprintRepository.findById(sprintId);
      
      if (!sprint) {
        return res.status(404).json({ message: 'Sprint not found' });
      }
      
      return res.status(200).json(sprint);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateSprint(req, res) {
    try {
      const { sprintId } = req.params;
      const sprintData = req.body;
      
      const sprint = await this.sprintRepository.findById(sprintId);
      if (!sprint) {
        return res.status(404).json({ message: 'Sprint not found' });
      }
      
      const updatedSprint = await this.sprintRepository.update(sprintId, sprintData);
      
      return res.status(200).json(updatedSprint);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteSprint(req, res) {
    try {
      const { sprintId } = req.params;
      
      const sprint = await this.sprintRepository.findById(sprintId);
      if (!sprint) {
        return res.status(404).json({ message: 'Sprint not found' });
      }
      
      await this.sprintRepository.delete(sprintId);
      
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = SprintController; 