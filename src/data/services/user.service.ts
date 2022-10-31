import { api } from './api';
import { Query, QueryString } from 'nestjs-prisma-querybuilder-interface';
import { FieldValues } from 'react-hook-form';
import { User } from '../models/user.model';

class UserServiceClass {
  async getUsers(query: Query) {
    const { data } = await api.get<User[]>('/users', {
      params: query,
      paramsSerializer: params => QueryString(params)
    });
    return data;
  }

  async getUser(userId: string, query: Query) {
    const { data } = await api.get<User>(`/users/${userId}`, {
      params: query,
      paramsSerializer: params => QueryString(params)
    });

    return data;
  }

  async createUser(newUser: FieldValues) {
    const { data } = await api.post<User>('/users', newUser);
    return data;
  }

  async updateUser(userId: string, updatedUser: FieldValues) {
    await api.put(`/users/${userId}`, updatedUser);
  }

  async deleteUser(userId: string) {
    await api.delete(`/users/${userId}`);
  }
}

export const UserService = new UserServiceClass();
