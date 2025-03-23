import axios from "axios";
import Cookies from "js-cookie";
import { User, UserCredentials, RegisterData } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Cookie options
const COOKIE_OPTIONS = {
  expires: 7, // 7 dias
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const
};

export const authService = {
  async register(data: RegisterData): Promise<User> {
    const response = await axios.post(`${API_URL}/users/register`, data);
    const { token, user } = response.data;
    
    // Salvar token em cookie
    Cookies.set("auth_token", token, COOKIE_OPTIONS);
    
    return user;
  },

  async login(credentials: UserCredentials): Promise<User> {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    const { token, user } = response.data;
    
    // Salvar token em cookie
    Cookies.set("auth_token", token, COOKIE_OPTIONS);
    
    return user;
  },

  async logout(): Promise<void> {
    try {
      // Fazer requisição de logout na API
      await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    } catch (error) {
      console.error("Erro ao fazer logout no servidor:", error);
    } finally {
      // Sempre remover o token do cookie, mesmo se houver erro na API
      Cookies.remove("auth_token");
    }
  },

  getToken(): string | null {
    return Cookies.get("auth_token") || null;
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },

  // Configurar o token padrão para todas as requisições do axios
  setAxiosAuthHeader(token: string | null): void {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  },

  // Obter o usuário atual através do token
  async getCurrentUser(): Promise<User | null> {
    try {
      const token = this.getToken();
      if (!token) return null;

      this.setAxiosAuthHeader(token);
      const response = await axios.get(`${API_URL}/auth/me`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter usuário atual:", error);
      return null;
    }
  }
}; 