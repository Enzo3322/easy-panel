const prisma = require('../prisma');
const TaskRepository = require('../../../domain/repositories/TaskRepository');
const Task = require('../../../domain/entities/Task');

class PrismaTaskRepository extends TaskRepository {
  async create(task) {
    const createdTask = await prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
        startDate: task.startDate,
        endDate: task.endDate,
        assigneeId: task.assigneeId,
        sprintId: task.sprintId,
        teamId: task.teamId
      }
    });
    
    return new Task(
      createdTask.id,
      createdTask.title,
      createdTask.description,
      createdTask.status,
      createdTask.startDate,
      createdTask.endDate,
      createdTask.assigneeId,
      createdTask.sprintId,
      createdTask.teamId
    );
  }

  async findById(id) {
    const task = await prisma.task.findUnique({
      where: { id }
    });
    
    if (!task) return null;
    
    return new Task(
      task.id,
      task.title,
      task.description,
      task.status,
      task.startDate,
      task.endDate,
      task.assigneeId,
      task.sprintId,
      task.teamId
    );
  }

  async findByTeam(teamId) {
    const tasks = await prisma.task.findMany({
      where: { teamId }
    });
    
    return tasks.map(task => new Task(
      task.id,
      task.title,
      task.description,
      task.status,
      task.startDate,
      task.endDate,
      task.assigneeId,
      task.sprintId,
      task.teamId
    ));
  }

  async findBySprint(sprintId) {
    const tasks = await prisma.task.findMany({
      where: { sprintId }
    });
    
    return tasks.map(task => new Task(
      task.id,
      task.title,
      task.description,
      task.status,
      task.startDate,
      task.endDate,
      task.assigneeId,
      task.sprintId,
      task.teamId
    ));
  }

  async findByAssignee(assigneeId) {
    const tasks = await prisma.task.findMany({
      where: { assigneeId }
    });
    
    return tasks.map(task => new Task(
      task.id,
      task.title,
      task.description,
      task.status,
      task.startDate,
      task.endDate,
      task.assigneeId,
      task.sprintId,
      task.teamId
    ));
  }

  async findByStatus(teamId, status) {
    const tasks = await prisma.task.findMany({
      where: { 
        teamId,
        status
      }
    });
    
    return tasks.map(task => new Task(
      task.id,
      task.title,
      task.description,
      task.status,
      task.startDate,
      task.endDate,
      task.assigneeId,
      task.sprintId,
      task.teamId
    ));
  }

  async update(id, taskData) {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: taskData
    });
    
    return new Task(
      updatedTask.id,
      updatedTask.title,
      updatedTask.description,
      updatedTask.status,
      updatedTask.startDate,
      updatedTask.endDate,
      updatedTask.assigneeId,
      updatedTask.sprintId,
      updatedTask.teamId
    );
  }

  async updateStatus(id, status) {
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status }
    });
    
    return new Task(
      updatedTask.id,
      updatedTask.title,
      updatedTask.description,
      updatedTask.status,
      updatedTask.startDate,
      updatedTask.endDate,
      updatedTask.assigneeId,
      updatedTask.sprintId,
      updatedTask.teamId
    );
  }

  async delete(id) {
    await prisma.task.delete({
      where: { id }
    });
    
    return true;
  }
}

module.exports = PrismaTaskRepository; 