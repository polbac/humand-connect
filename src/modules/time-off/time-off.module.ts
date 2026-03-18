import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { timeOffService } from '../../services/time-off.service.js';

const balancesSchema = {
  limit: z.number().min(1).max(100).default(10).describe('Number of balances per page'),
  page: z.number().min(1).default(1).describe('Page number'),
  employeeInternalId: z.string().optional().describe('Filter by employee internal ID'),
} as const;

const requestsSchema = {
  limit: z.number().min(1).max(100).default(10).describe('Number of requests per page'),
  page: z.number().min(1).default(1).describe('Page number'),
  employeeInternalId: z.string().optional().describe('Filter by employee internal ID'),
  status: z.string().optional().describe('Filter by status (e.g., APPROVED, REJECTED, PENDING)'),
} as const;

const updateRequestStateSchema = {
  requestId: z.number().describe('The ID of the time-off request to update'),
  state: z.enum(['APPROVED', 'REJECTED']).describe('The new state for the request'),
  comment: z.string().optional().describe('Optional comment for approval or rejection'),
} as const;

export function registerTimeOffModule(server: McpServer) {
  // timeoff_balances_list
  server.tool(
    'timeoff_balances_list',
    'List time-off balances from Humand with pagination',
    balancesSchema,
    async ({ limit, page, employeeInternalId }) => {
      try {
        const result = await timeOffService.getBalances({ limit, page, employeeInternalId });
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  // Aliases
  server.tool('dias_libres_balances_list', 'Lista saldos de días libres de Humand', balancesSchema, async (params) => {
    const result = await timeOffService.getBalances(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('licencias_balances_list', 'Lista saldos de licencias de Humand', balancesSchema, async (params) => {
    const result = await timeOffService.getBalances(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('vacaciones_balances_list', 'Lista saldos de vacaciones de Humand', balancesSchema, async (params) => {
    const result = await timeOffService.getBalances(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });

  // timeoff_requests_list
  server.tool(
    'timeoff_requests_list',
    'List time-off requests from Humand with pagination and optional filters',
    requestsSchema,
    async ({ limit, page, employeeInternalId, status }) => {
      try {
        const result = await timeOffService.getRequests({ limit, page, employeeInternalId, status });
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  // Aliases
  server.tool('dias_libres_requests_list', 'Lista solicitudes de días libres de Humand', requestsSchema, async (params) => {
    const result = await timeOffService.getRequests(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('licencias_requests_list', 'Lista solicitudes de licencias de Humand', requestsSchema, async (params) => {
    const result = await timeOffService.getRequests(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('vacaciones_requests_list', 'Lista solicitudes de vacaciones de Humand', requestsSchema, async (params) => {
    const result = await timeOffService.getRequests(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });

  // timeoff_requests_update_state
  server.tool(
    'timeoff_requests_update_state',
    'Approve or reject a time-off request from Humand',
    updateRequestStateSchema,
    async ({ requestId, state, comment }) => {
      try {
        const result = await timeOffService.updateRequestState(requestId, state, comment);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  // Aliases
  server.tool('dias_libres_requests_update_state', 'Aprueba o rechaza una solicitud de días libres de Humand', updateRequestStateSchema, async (params) => {
    const result = await timeOffService.updateRequestState(params.requestId, params.state as 'APPROVED' | 'REJECTED', params.comment);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('licencias_requests_update_state', 'Aprueba o rechaza una solicitud de licencias de Humand', updateRequestStateSchema, async (params) => {
    const result = await timeOffService.updateRequestState(params.requestId, params.state as 'APPROVED' | 'REJECTED', params.comment);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('vacaciones_requests_update_state', 'Aprueba o rechaza una solicitud de vacaciones de Humand', updateRequestStateSchema, async (params) => {
    const result = await timeOffService.updateRequestState(params.requestId, params.state as 'APPROVED' | 'REJECTED', params.comment);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
}
