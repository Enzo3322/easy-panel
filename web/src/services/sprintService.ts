import api from '@/lib/api';
import { Sprint, SprintCreation, SprintUpdate } from '@/types';

export const sprintService = {
  async createSprint(teamId: string, sprintData: SprintCreation): Promise<Sprint> {
    const response = await api.post<Sprint>(`/teams/${teamId}/sprints`, sprintData);
    return response.data;
  },

  async getTeamSprints(teamId: string): Promise<Sprint[]> {
    const response = await api.get<Sprint[]>(`/teams/${teamId}/sprints`);
    return response.data;
  },

  async getSprintById(sprintId: string): Promise<Sprint> {
    const response = await api.get<Sprint>(`/sprints/${sprintId}`);
    return response.data;
  },

  async updateSprint(sprintId: string, sprintData: SprintUpdate): Promise<Sprint> {
    const response = await api.put<Sprint>(`/sprints/${sprintId}`, sprintData);
    return response.data;
  },

  async deleteSprint(sprintId: string): Promise<void> {
    await api.delete(`/sprints/${sprintId}`);
  }
}; 