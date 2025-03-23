class Task {
  constructor(id, title, description, status = 'TO_DO', startDate = null, endDate = null, assigneeId = null, sprintId = null, teamId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.startDate = startDate;
    this.endDate = endDate;
    this.assigneeId = assigneeId;
    this.sprintId = sprintId;
    this.teamId = teamId;
  }
}

module.exports = Task; 