import { apiService } from './api.service.js';
import type { TimeOffBalancesResponse, TimeOffRequestsResponse, TimeOffRequest } from '../modules/time-off/time-off.types.js';

export class TimeOffService {
  async getBalances(params: {
    limit?: number;
    page?: number;
    employeeInternalId?: string;
  }): Promise<TimeOffBalancesResponse> {
    return apiService.get<TimeOffBalancesResponse>('/time-off/balances', {
      limit: params.limit ?? 10,
      page: params.page ?? 1,
      employeeInternalId: params.employeeInternalId,
    });
  }

  async getRequests(params: {
    limit?: number;
    page?: number;
    employeeInternalId?: string;
    status?: string;
  }): Promise<TimeOffRequestsResponse> {
    return apiService.get<TimeOffRequestsResponse>('/time-off/requests', {
      limit: params.limit ?? 10,
      page: params.page ?? 1,
      employeeInternalId: params.employeeInternalId,
      status: params.status,
    });
  }

  async updateRequestState(requestId: number, state: 'APPROVED' | 'REJECTED', comment?: string): Promise<TimeOffRequest> {
    return apiService.put<TimeOffRequest>(`/time-off/requests/${requestId}/state`, {
      state,
      comment,
    });
  }
}

export const timeOffService = new TimeOffService();
