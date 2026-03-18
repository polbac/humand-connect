import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { jobPositionsService } from './job-positions.service.js';

const listSchema = {
  limit: z.number().min(1).max(100).default(10).describe('Number of positions per page'),
  page: z.number().min(1).default(1).describe('Page number'),
} as const;

const getSchema = {
  id: z.number().describe('The job position ID'),
} as const;

const updateSchema = {
  id: z.number().describe('The job position ID to update'),
  name: z.string().optional().describe('Position name'),
  description: z.string().nullable().optional().describe('Position description'),
  parentId: z.number().nullable().optional().describe('Parent position ID'),
  departmentId: z.number().nullable().optional().describe('Department ID'),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional().describe('Position status'),
} as const;

export function registerJobPositionsModule(server: McpServer) {
  server.tool(
    'job_positions_list',
    'List all job positions from Humand with pagination',
    listSchema,
    async (params) => {
      try {
        const result = await jobPositionsService.list(params);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'posiciones_list',
    'Lista todas las posiciones de trabajo de Humand con paginación',
    listSchema,
    async (params) => {
      try {
        const result = await jobPositionsService.list(params);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'job_position_get',
    'Get a single job position by ID',
    getSchema,
    async (params) => {
      try {
        const result = await jobPositionsService.get(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'posicion_get',
    'Obtiene una posición de trabajo por su ID',
    getSchema,
    async (params) => {
      try {
        const result = await jobPositionsService.get(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'job_position_members',
    'Get members of a job position by ID',
    getSchema,
    async (params) => {
      try {
        const result = await jobPositionsService.members(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'posicion_miembros',
    'Obtiene los miembros de una posición de trabajo por su ID',
    getSchema,
    async (params) => {
      try {
        const result = await jobPositionsService.members(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'job_position_update',
    'Update an existing job position in Humand',
    updateSchema,
    async (params) => {
      try {
        const { id, ...data } = params;
        const result = await jobPositionsService.update(id, data);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'posicion_actualizar',
    'Actualiza una posición de trabajo existente en Humand',
    updateSchema,
    async (params) => {
      try {
        const { id, ...data } = params;
        const result = await jobPositionsService.update(id, data);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );
}
