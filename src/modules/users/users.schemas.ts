import { z } from 'zod';

export const UserRelationshipSchema = z.object({
  employeeInternalId: z.string(),
  name: z.enum(['BOSS', 'SUBORDINATE']),
});

export const UserSegmentationSchema = z.object({
  group: z.string(),
  item: z.string(),
});

export const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().nullable(),
  employeeInternalId: z.string(),
  nickname: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  birthdate: z.string().nullable(),
  hiringDate: z.string().nullable(),
  status: z.enum(['ACTIVE', 'UNCLAIMED', 'DEACTIVATED']),
  deleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  fields: z.array(z.unknown()),
  relationships: z.array(UserRelationshipSchema),
  segmentations: z.array(UserSegmentationSchema),
  workdays: z.array(z.string()),
});

export const UsersListResponseSchema = z.object({
  count: z.number(),
  users: z.array(UserSchema),
});

export const UsersListParamsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
  search: z.string().optional(),
});

export const UserGetParamsSchema = z.object({
  employeeInternalId: z.string().min(1),
});

export const UserCreateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  employeeInternalId: z.string().min(1),
  password: z.string().min(1),
  email: z.string().email().optional(),
  nickname: z.string().optional(),
  phoneNumber: z.string().optional(),
  birthdate: z.string().optional(),
  hiringDate: z.string().optional(),
});

export const UserUpdateSchema = z.object({
  employeeInternalId: z.string().min(1),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  nickname: z.string().optional(),
  phoneNumber: z.string().optional(),
  birthdate: z.string().optional(),
  hiringDate: z.string().optional(),
});
