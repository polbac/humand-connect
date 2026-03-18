import { ApiService } from './api.service';

interface JobPosition {
  id: number;
  name: string;
  description?: string;
  parentId?: number;
  departmentId?: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface JobPositionMember {
  employeeInternalId: string;
  firstName: string;
  lastName: string;
  email?: string;
  nickname?: string;
}

interface PaginatedJobPositionList {
  count: number;
  items: JobPosition[];
  limit: number;
  page: number;
  totalPages: number;
}

interface PaginatedJobPositionMemberList {
  count: number;
  items: JobPositionMember[];
  limit: number;
  page: number;
  totalPages: number;
}

interface UpdateJobPositionInput {
  name?: string;
  description?: string | null;
  parentId?: number | null;
  departmentId?: number | null;
  status?: 'ACTIVE' | 'INACTIVE';
}

export class JobPositionsService {
  async list(params?: { limit?: number; page?: number }): Promise<PaginatedJobPositionList> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<PaginatedJobPositionList>('/job-positions', params);
  }

  async get(id: number): Promise<JobPosition> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<JobPosition>(`/job-positions/${id}`);
  }

  async members(id: number, params?: { limit?: number; page?: number }): Promise<PaginatedJobPositionMemberList> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<PaginatedJobPositionMemberList>(`/job-positions/${id}/members`, params);
  }

  async update(id: number, data: UpdateJobPositionInput): Promise<JobPosition> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.patch<JobPosition>(`/job-positions/${id}`, data);
  }
}
