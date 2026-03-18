import { ApiService } from './api.service';

interface User {
  employeeInternalId: string;
  firstName: string;
  lastName: string;
  email?: string;
  nickname?: string;
  phoneNumber?: string;
  birthdate?: string;
  hiringDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UsersListResponse {
  count: number;
  items: User[];
  limit: number;
  page: number;
  totalPages: number;
}

interface CreateUserInput {
  firstName: string;
  lastName: string;
  employeeInternalId: string;
  password: string;
  email?: string;
  nickname?: string;
  phoneNumber?: string;
  birthdate?: string;
  hiringDate?: string;
}

interface UpdateUserInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  nickname?: string;
  phoneNumber?: string;
  birthdate?: string;
  hiringDate?: string;
}

export class UsersService {
  async list(params: { limit?: number; page?: number; search?: string }): Promise<UsersListResponse> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<UsersListResponse>('/users', {
      limit: params.limit ?? 10,
      page: params.page ?? 1,
      search: params.search,
    });
  }

  async get(employeeInternalId: string): Promise<User> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<User>(`/users/${employeeInternalId}`);
  }

  async create(data: CreateUserInput): Promise<User> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.post<User>('/users', data);
  }

  async update(employeeInternalId: string, data: UpdateUserInput): Promise<User> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.patch<User>(`/users/${employeeInternalId}`, data);
  }
}
