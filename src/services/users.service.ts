import { apiService } from './api.service.js';
import type {
  UsersListResponse,
  User,
  CreateUserInput,
  UpdateUserInput,
} from '../modules/users/users.types.js';

export class UsersService {
  async list(params: {
    limit?: number;
    page?: number;
    search?: string;
  }): Promise<UsersListResponse> {
    return apiService.get<UsersListResponse>('/users', {
      limit: params.limit ?? 10,
      page: params.page ?? 1,
      search: params.search,
    });
  }

  async get(employeeInternalId: string): Promise<User> {
    return apiService.get<User>(`/users/${employeeInternalId}`);
  }

  async create(data: CreateUserInput): Promise<User> {
    return apiService.post<User>('/users', data);
  }

  async update(employeeInternalId: string, data: UpdateUserInput): Promise<User> {
    return apiService.patch<User>(`/users/${employeeInternalId}`, data);
  }
}

export const usersService = new UsersService();
