import api from '@/lib/api';
import { Task, TaskCreation, TaskUpdate } from '@/types';

export const taskService = {
  async createTask(sprintId: string, taskData: TaskCreation): Promise<Task> {
    const response = await api.post<Task>(`/sprints/${sprintId}/tasks`, taskData);
    return response.data;
  },

  async getSprintTasks(sprintId: string): Promise<Task[]> {
    const response = await api.get<Task[]>(`/sprints/${sprintId}/tasks`);
    return response.data;
  },

  async getTaskById(taskId: string): Promise<Task> {
    const response = await api.get<Task>(`/tasks/${taskId}`);
    return response.data;
  },

  async updateTask(taskId: string, taskData: TaskUpdate): Promise<Task> {
    const response = await api.put<Task>(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  async deleteTask(taskId: string): Promise<void> {
    await api.delete(`/tasks/${taskId}`);
  }
}; 