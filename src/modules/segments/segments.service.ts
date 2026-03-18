import { z } from 'zod';
import { apiService } from '../../services/api.service.js';
import type { Segment, PaginatedSegmentList, CreateSegmentDto } from './segments.types.js';

const ResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  memberCount: z.number(),
});

const PaginatedResponseSchema = z.object({
  count: z.number(),
  items: z.array(ResponseSchema),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export class SegmentsService {
  async list(params?: { limit?: number; page?: number }): Promise<PaginatedSegmentList> {
    return apiService.get<PaginatedSegmentList>('/segments', params);
  }

  async get(id: number): Promise<Segment> {
    return apiService.get<Segment>(`/segments/${id}`);
  }

  async create(data: CreateSegmentDto): Promise<Segment> {
    return apiService.post<Segment>('/segments', data);
  }
}

export const segmentsService = new SegmentsService();