import { apiService } from '../../services/api.service.js';
import type {
  Department,
  PaginatedDepartmentList,
  DepartmentMember,
  PaginatedDepartmentMemberList,
} from './departments.types.js';

export class DepartmentsService {
  async list(params?: { limit?: number; page?: number }): Promise<PaginatedDepartmentList> {
    return apiService.get<PaginatedDepartmentList>('/departments', params);
  }

  async get(id: number): Promise<Department> {
    return apiService.get<Department>(`/departments/${id}`);
  }

  async members(id: number, params?: { limit?: number; page?: number }): Promise<PaginatedDepartmentMemberList> {
    return apiService.get<PaginatedDepartmentMemberList>(`/departments/${id}/members`, params);
  }

  async children(id: number, params?: { limit?: number; page?: number }): Promise<PaginatedDepartmentList> {
    return apiService.get<PaginatedDepartmentList>(`/departments/${id}/children`, params);
  }
}

export const departmentsService = new DepartmentsService();