import { z } from 'zod';

export const JobPositionSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  parentId: z.number().nullable(),
  departmentId: z.number().nullable(),
  status: z.enum(['ACTIVE', 'INACTIVE']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const PaginatedJobPositionListSchema = z.object({
  count: z.number(),
  items: z.array(JobPositionSchema),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export const JobPositionListParamsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
});

export const JobPositionByIdParamsSchema = z.object({
  id: z.number(),
});

export const JobPositionMemberSchema = z.object({
  id: z.number(),
  userId: z.number(),
  jobPositionId: z.number(),
  employeeInternalId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().nullable(),
  status: z.string(),
  createdAt: z.string(),
});

export const PaginatedJobPositionMemberListSchema = z.object({
  count: z.number(),
  items: z.array(JobPositionMemberSchema),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export const JobPositionMembersParamsSchema = z.object({
  id: z.number(),
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
});

export const UpdateJobPositionSchema = z.object({
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  parentId: z.number().nullable().optional(),
  departmentId: z.number().nullable().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

export const JobPositionUpdateParamsSchema = z.object({
  id: z.number(),
  data: UpdateJobPositionSchema,
});
