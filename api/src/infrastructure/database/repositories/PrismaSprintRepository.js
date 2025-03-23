const prisma = require('../prisma');
const SprintRepository = require('../../../domain/repositories/SprintRepository');
const Sprint = require('../../../domain/entities/Sprint');

class PrismaSprintRepository extends SprintRepository {
  async create(sprint) {
    const createdSprint = await prisma.sprint.create({
      data: {
        id: sprint.id,
        name: sprint.name,
        startDate: sprint.startDate,
        endDate: sprint.endDate,
        teamId: sprint.teamId
      }
    });
    
    return new Sprint(
      createdSprint.id,
      createdSprint.name,
      createdSprint.startDate,
      createdSprint.endDate,
      createdSprint.teamId
    );
  }

  async findById(id) {
    const sprint = await prisma.sprint.findUnique({
      where: { id }
    });
    
    if (!sprint) return null;
    
    return new Sprint(
      sprint.id,
      sprint.name,
      sprint.startDate,
      sprint.endDate,
      sprint.teamId
    );
  }

  async findByTeam(teamId) {
    const sprints = await prisma.sprint.findMany({
      where: { teamId }
    });
    
    return sprints.map(sprint => new Sprint(
      sprint.id,
      sprint.name,
      sprint.startDate,
      sprint.endDate,
      sprint.teamId
    ));
  }

  async update(id, sprintData) {
    const updatedSprint = await prisma.sprint.update({
      where: { id },
      data: sprintData
    });
    
    return new Sprint(
      updatedSprint.id,
      updatedSprint.name,
      updatedSprint.startDate,
      updatedSprint.endDate,
      updatedSprint.teamId
    );
  }

  async delete(id) {
    await prisma.sprint.delete({
      where: { id }
    });
    
    return true;
  }
}

module.exports = PrismaSprintRepository; 