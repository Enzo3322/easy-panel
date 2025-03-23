const prisma = require('../prisma');
const UserTeamRepository = require('../../../domain/repositories/UserTeamRepository');
const UserTeam = require('../../../domain/entities/UserTeam');

class PrismaUserTeamRepository extends UserTeamRepository {
  async create(userTeam) {
    const createdUserTeam = await prisma.userTeam.create({
      data: {
        id: userTeam.id,
        userId: userTeam.userId,
        teamId: userTeam.teamId,
        role: userTeam.role
      }
    });
    
    return new UserTeam(
      createdUserTeam.id,
      createdUserTeam.userId,
      createdUserTeam.teamId,
      createdUserTeam.role
    );
  }

  async findById(id) {
    const userTeam = await prisma.userTeam.findUnique({
      where: { id }
    });
    
    if (!userTeam) return null;
    
    return new UserTeam(
      userTeam.id,
      userTeam.userId,
      userTeam.teamId,
      userTeam.role
    );
  }

  async findByUserAndTeam(userId, teamId) {
    const userTeam = await prisma.userTeam.findFirst({
      where: {
        userId,
        teamId
      }
    });
    
    if (!userTeam) return null;
    
    return new UserTeam(
      userTeam.id,
      userTeam.userId,
      userTeam.teamId,
      userTeam.role
    );
  }

  async findByTeam(teamId) {
    const userTeams = await prisma.userTeam.findMany({
      where: { teamId },
      include: { user: true }
    });
    
    return userTeams.map(ut => new UserTeam(
      ut.id,
      ut.userId,
      ut.teamId,
      ut.role
    ));
  }

  async updateRole(id, role) {
    const updatedUserTeam = await prisma.userTeam.update({
      where: { id },
      data: { role }
    });
    
    return new UserTeam(
      updatedUserTeam.id,
      updatedUserTeam.userId,
      updatedUserTeam.teamId,
      updatedUserTeam.role
    );
  }

  async delete(id) {
    await prisma.userTeam.delete({
      where: { id }
    });
    
    return true;
  }

  async deleteByUserAndTeam(userId, teamId) {
    await prisma.userTeam.deleteMany({
      where: {
        userId,
        teamId
      }
    });
    
    return true;
  }
}

module.exports = PrismaUserTeamRepository; 