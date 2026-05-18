// src/services/users.service.ts
import api from './api.service';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export const UsersService = {
  // POST /users
  async create(data: CreateUserDto): Promise<User> {
    const response = await api.post('/users', data);
    return response.data;
  },

  // GET /users
  async getAll(): Promise<User[]> {
    const response = await api.get('/users');
    return response.data;
  },

  // GET /users/:id
  async getById(id: string): Promise<User> {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // PATCH /users/:id
  async update(
    id: string,
    data: UpdateUserDto,
  ): Promise<User> {
    const response = await api.patch(`/users/${id}`, data);
    return response.data;
  },

  // DELETE /users/:id
  async remove(id: string): Promise<void> {
    await api.delete(`/users/${id}`);
  },
};