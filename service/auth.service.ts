// src/services/auth.service.ts
import api from './api.service';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  access_token: string;
  user?: User;
}

export const AuthService = {
  // POST /users
  async register(data: RegisterDto) {
    const response = await api.post('/users', data);
    return response.data;
  },

  // POST /auth/login
  async login(
    data: LoginDto,
  ): Promise<AuthResponse> {
    const response = await api.post(
      '/auth/login',
      data,
    );
  
    const { access_token, user } =
      response.data;
  
    localStorage.setItem(
      'token',
      access_token,
    );
  
    // Salva o usuário
    if (user) {
      localStorage.setItem(
        'user',
        JSON.stringify(user),
      );
    }
  
    return response.data;
  },

  // Retorna usuário salvo
  getUser(): User | null {
    if (
      typeof window === 'undefined'
    ) {
      return null;
    }

    const user =
      localStorage.getItem('user');

    if (!user) {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch {
      return null;
    }
  },

  // Logout
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Token
  getToken(): string | null {
    return localStorage.getItem(
      'token',
    );
  },

  // Está autenticado?
  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};