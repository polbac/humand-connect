import { apiService } from '../../services/api.service.js';
import type {
  JobPosition,
  PaginatedJobPositionList,
  JobPositionMember,
  PaginatedJobPositionMemberList,
  UpdateJobPosition,
} from './job-positions.types.js';

export class JobPositionsService {
  async list(params?: { limit?: number; page?: number }): Promise<PaginatedJobPositionList> {
    return apiService.get<PaginatedJobPositionList>('/job-positions', params);
  }

  async get(id: number): Promise<JobPosition> {
    return apiService.get<JobPosition>(`/job-positions/${id}`);
  }

  async members(
    id: number,
    params?: { limit?: number; page?: number }
  ): Promise<PaginatedJobPositionMemberList> {
    return apiService.get<PaginatedJobPositionMemberList>(`/job-positions/${id}/members`, params);
  }

  async update(id: number, data: UpdateJobPosition): Promise<JobPosition> {
    return apiService.patch<JobPosition>(`/job-positions/${id}`, data);
  }
}

export const jobPositionsService = new JobPositionsService();
