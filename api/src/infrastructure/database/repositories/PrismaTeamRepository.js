const prisma = require('../prisma');
const TeamRepository = require('../../../domain/repositories/TeamRepository');
const Team = require('../../../domain/entities/Team');

class PrismaTeamRepository extends TeamRepository {
  async create(team) {
    const createdTeam = await prisma.team.create({
      data: {
        id: team.id,
        name: team.name,
        creatorId: team.creatorId
      }
    });
    
    return new Team(
      createdTeam.id,
      createdTeam.name,
      createdTeam.creatorId
    );
  }

  async findById(id) {
    const team = await prisma.team.findUnique({
      where: { id }
    });
    
    if (!team) return null;
    
    return new Team(
      team.id,
      team.name,
      team.creatorId
    );
  }

  async findByCreator(creatorId) {
    const teams = await prisma.team.findMany({
      where: { creatorId }
    });
    
    return teams.map(team => new Team(
      team.id,
      team.name,
      team.creatorId
    ));
  }

  async findUserTeams(userId) {
    const userTeams = await prisma.userTeam.findMany({
      where: { userId },
      include: { team: true }
    });
    
    return userTeams.map(ut => new Team(
      ut.team.id,
      ut.team.name,
      ut.team.creatorId
    ));
  }

  async update(id, teamData) {
    const updatedTeam = await prisma.team.update({
      where: { id },
      data: teamData
    });
    
    return new Team(
      updatedTeam.id,
      updatedTeam.name,
      updatedTeam.creatorId
    );
  }

  async delete(id) {
    await prisma.team.delete({
      where: { id }
    });
    
    return true;
  }
}

module.exports = PrismaTeamRepository; 