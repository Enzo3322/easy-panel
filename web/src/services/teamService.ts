import api from '@/lib/api';
import { Team, TeamCreation, TeamInvitation, UserTeam } from '@/types';

export const teamService = {
  async createTeam(teamData: TeamCreation): Promise<Team> {
    const response = await api.post<Team>('/teams', teamData);
    return response.data;
  },

  async getUserTeams(): Promise<Team[]> {
    const response = await api.get<Team[]>('/teams');
    return response.data;
  },

  async getTeamById(teamId: string): Promise<Team> {
    const response = await api.get<Team>(`/teams/${teamId}`);
    return response.data;
  },

  async inviteUser(teamId: string, invitationData: TeamInvitation): Promise<UserTeam> {
    const response = await api.post<UserTeam>(`/teams/${teamId}/invite`, invitationData);
    return response.data;
  }
}; 