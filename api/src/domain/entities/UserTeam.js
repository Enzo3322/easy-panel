class UserTeam {
  constructor(id, userId, teamId, role = 'member') {
    this.id = id;
    this.userId = userId;
    this.teamId = teamId;
    this.role = role;
  }
}

module.exports = UserTeam; 