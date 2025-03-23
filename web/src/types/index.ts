// Interfaces relacionadas a usuários
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Interfaces relacionadas a equipes
export interface Team {
  id: string;
  name: string;
  description?: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamCreation {
  name: string;
  description?: string;
}

export interface TeamInvitation {
  email: string;
  role: 'admin' | 'member';
}

export interface UserTeam {
  id: string;
  userId: string;
  teamId: string;
  role: 'owner' | 'admin' | 'member';
  createdAt: string;
  updatedAt: string;
}

// Interfaces relacionadas a sprints
export interface Sprint {
  id: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  teamId: string;
  status: 'planned' | 'active' | 'completed';
  createdAt: string;
  updatedAt: string;
}

export interface SprintCreation {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  status?: 'planned' | 'active' | 'completed';
}

export interface SprintUpdate {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: 'planned' | 'active' | 'completed';
}

// Interfaces relacionadas a tarefas
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
  sprintId: string;
  assigneeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskCreation {
  title: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'review' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assigneeId?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: 'todo' | 'in-progress' | 'review' | 'done';
  priority?: 'low' | 'medium' | 'high';
  assigneeId?: string;
}

// Interface para erros da API
export interface ApiError {
  status: number;
  message: string;
  details?: any;
} 