import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { departmentsService } from './departments.service.js';

const listSchema = {
  limit: z.number().min(1).max(100).default(10).describe('Number of departments per page'),
  page: z.number().min(1).default(1).describe('Page number'),
} as const;

const getSchema = {
  id: z.number().describe('The department ID'),
} as const;

export function registerDepartmentsModule(server: McpServer) {
  server.tool(
    'departments_list',
    'List all departments from Humand with pagination',
    listSchema,
    async (params) => {
      try {
        const result = await departmentsService.list(params);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'departamentos_list',
    'Lista todos los departamentos de Humand con paginación',
    listSchema,
    async (params) => {
      try {
        const result = await departmentsService.list(params);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'department_get',
    'Get a single department by ID',
    getSchema,
    async (params) => {
      try {
        const result = await departmentsService.get(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'departamento_get',
    'Obtiene un departamento por su ID',
    getSchema,
    async (params) => {
      try {
        const result = await departmentsService.get(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'department_members',
    'Get members of a department by ID',
    getSchema,
    async (params) => {
      try {
        const result = await departmentsService.members(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'departamento_miembros',
    'Obtiene los miembros de un departamento por su ID',
    getSchema,
    async (params) => {
      try {
        const result = await departmentsService.members(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'department_children',
    'Get child departments of a department by ID',
    getSchema,
    async (params) => {
      try {
        const result = await departmentsService.children(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'departamento_hijos',
    'Obtiene los departamentos hijos de un departamento por su ID',
    getSchema,
    async (params) => {
      try {
        const result = await departmentsService.children(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );
}