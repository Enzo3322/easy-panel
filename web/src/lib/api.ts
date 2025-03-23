import axios from 'axios';
import { authService } from '@/services';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar o token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Se o erro for 401 (não autorizado) e estivermos no cliente
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      // Limpar token e redirecionar para login
      authService.logout();
      // O redirecionamento será tratado pelo middleware na próxima requisição
    }
    return Promise.reject(error);
  }
);

export default api; 