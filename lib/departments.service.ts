import { ApiService } from './api.service';

interface Department {
  id: number;
  name: string;
  description?: string;
  parentId?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface DepartmentMember {
  employeeInternalId: string;
  firstName: string;
  lastName: string;
  email?: string;
  nickname?: string;
  positionName?: string;
}

interface PaginatedDepartmentList {
  count: number;
  items: Department[];
  limit: number;
  page: number;
  totalPages: number;
}

interface PaginatedDepartmentMemberList {
  count: number;
  items: DepartmentMember[];
  limit: number;
  page: number;
  totalPages: number;
}

export class DepartmentsService {
  async list(params?: { limit?: number; page?: number }): Promise<PaginatedDepartmentList> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<PaginatedDepartmentList>('/departments', params);
  }

  async get(id: number): Promise<Department> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<Department>(`/departments/${id}`);
  }

  async members(id: number, params?: { limit?: number; page?: number }): Promise<PaginatedDepartmentMemberList> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<PaginatedDepartmentMemberList>(`/departments/${id}/members`, params);
  }

  async children(id: number, params?: { limit?: number; page?: number }): Promise<PaginatedDepartmentList> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<PaginatedDepartmentList>(`/departments/${id}/children`, params);
  }
}
