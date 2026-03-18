import { z } from 'zod';
import { apiService } from '../../services/api.service.js';

const CreateDtoSchema = z.object({
  name: z.string().min(1).describe('Resource name'),
  description: z.string().optional().describe('Resource description'),
});

const UpdateDtoSchema = CreateDtoSchema.partial();

const ResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

type CreateDto = z.infer<typeof CreateDtoSchema>;
type UpdateDto = z.infer<typeof UpdateDtoSchema>;
type Response = z.infer<typeof ResponseSchema>;

export class FeatureService {
  async list(params?: { limit?: number; page?: number }): Promise<{ data: Response[]; total: number }> {
    return apiService.get<{ data: Response[]; total: number }>('/endpoint', params);
  }

  async get(id: string): Promise<Response> {
    return apiService.get<Response>(`/endpoint/${id}`);
  }

  async create(data: CreateDto): Promise<Response> {
    return apiService.post<Response>('/endpoint', data);
  }

  async update(id: string, data: UpdateDto): Promise<Response> {
    return apiService.patch<Response>(`/endpoint/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    await apiService.delete(`/endpoint/${id}`);
  }
}

export const featureService = new FeatureService();
