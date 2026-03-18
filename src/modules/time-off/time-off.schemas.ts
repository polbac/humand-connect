import { z } from 'zod';
import { apiService } from '../../services/api.service.js';

export const TimeOffBalanceSchema = z.object({
  amountRequested: z.number(),
  currentBalance: z.number(),
  cycle: z.object({
    fromDate: z.string(),
    toDate: z.string(),
    title: z.string(),
  }),
  policy: z.unknown(),
  policyType: z.unknown(),
  user: z.unknown(),
});

export const TimeOffRequestSchema = z.object({
  amountRequested: z.number(),
  amountInTime: z.number(),
  amountInMoney: z.number(),
  creator: z.unknown().nullable(),
  description: z.string().nullable(),
  from: z.object({
    consumptionType: z.string(),
    date: z.string(),
    time: z.string().nullable(),
  }),
  id: z.number(),
  issuer: z.unknown(),
  policyType: z.unknown(),
  rejectionReason: z.string().nullable(),
  requestPolicyId: z.number(),
  status: z.string(),
  to: z.object({
    consumptionType: z.string(),
    date: z.string(),
    time: z.string().nullable(),
  }),
  updatedAt: z.string(),
  userId: z.number(),
});

export const TimeOffBalancesResponseSchema = z.object({
  count: z.number(),
  items: z.array(TimeOffBalanceSchema),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export const TimeOffRequestsResponseSchema = z.object({
  count: z.number(),
  items: z.array(TimeOffRequestSchema),
  limit: z.number(),
  page: z.number(),
  totalPages: z.number(),
});

export const TimeOffBalancesParamsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
  userId: z.number().optional(),
});

export const TimeOffRequestsParamsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
  userId: z.number().optional(),
  status: z.string().optional(),
});
