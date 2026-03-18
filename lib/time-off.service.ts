import { ApiService } from './api.service';

interface TimeOffBalance {
  id: number;
  employeeInternalId: string;
  balanceType: string;
  available: number;
  used: number;
  total: number;
  year: number;
}

interface TimeOffBalancesResponse {
  count: number;
  items: TimeOffBalance[];
  limit: number;
  page: number;
  totalPages: number;
}

interface TimeOffRequest {
  id: number;
  employeeInternalId: string;
  balanceType: string;
  startDate: string;
  endDate: string;
  status: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
}

interface TimeOffRequestsResponse {
  count: number;
  items: TimeOffRequest[];
  limit: number;
  page: number;
  totalPages: number;
}

export class TimeOffService {
  async getBalances(params: { limit?: number; page?: number; employeeInternalId?: string }): Promise<TimeOffBalancesResponse> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<TimeOffBalancesResponse>('/time-off/balances', {
      limit: params.limit ?? 10,
      page: params.page ?? 1,
      employeeInternalId: params.employeeInternalId,
    });
  }

  async getRequests(params: { limit?: number; page?: number; employeeInternalId?: string; status?: string }): Promise<TimeOffRequestsResponse> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.get<TimeOffRequestsResponse>('/time-off/requests', {
      limit: params.limit ?? 10,
      page: params.page ?? 1,
      employeeInternalId: params.employeeInternalId,
      status: params.status,
    });
  }

  async updateRequestState(requestId: number, state: 'APPROVED' | 'REJECTED', comment?: string): Promise<TimeOffRequest> {
    const { getCurrentConfig } = await import('./api.service');
    const api = new ApiService(getCurrentConfig());
    return api.put<TimeOffRequest>(`/time-off/requests/${requestId}/state`, {
      state,
      comment,
    });
  }
}
