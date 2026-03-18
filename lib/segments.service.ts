import { ApiService } from './api.service';

interface Segment {
  id: number;
  name: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  memberCount: number;
}

interface PaginatedSegmentList {
  count: number;
  items: Segment[];
  limit: number;
  page: number;
  totalPages: number;
}

interface CreateSegmentDto {
  name: string;
  description?: string;
}

export class SegmentsService {
  async list(params?: { limit?: number; page?: number }): Promise<PaginatedSegmentList> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<PaginatedSegmentList>('/segments', params);
  }

  async get(id: number): Promise<Segment> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<Segment>(`/segments/${id}`);
  }

  async create(data: CreateSegmentDto): Promise<Segment> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.post<Segment>('/segments', data);
  }
}
