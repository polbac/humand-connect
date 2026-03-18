import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { segmentsService } from './segments.service.js';

const listSchema = {
  limit: z.number().min(1).max(100).default(10).describe('Number of segments per page'),
  page: z.number().min(1).default(1).describe('Page number'),
} as const;

const getSchema = {
  id: z.number().describe('The segment ID'),
} as const;

const createSchema = {
  name: z.string().min(1).describe('Segment name'),
  description: z.string().optional().describe('Segment description'),
} as const;

export function registerSegmentsModule(server: McpServer) {
  server.tool(
    'segments_list',
    'List all segments from Humand with pagination',
    listSchema,
    async (params) => {
      try {
        const result = await segmentsService.list(params);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'segmentos_list',
    'Lista todos los segmentos de Humand con paginación',
    listSchema,
    async (params) => {
      try {
        const result = await segmentsService.list(params);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'segments_get',
    'Get a single segment by ID',
    getSchema,
    async (params) => {
      try {
        const result = await segmentsService.get(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'segmento_get',
    'Obtiene un segmento por su ID',
    getSchema,
    async (params) => {
      try {
        const result = await segmentsService.get(params.id);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'segments_create',
    'Create a new segment in Humand',
    createSchema,
    async (params) => {
      try {
        const result = await segmentsService.create(params);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  server.tool(
    'segmento_crear',
    'Crea un nuevo segmento en Humand',
    createSchema,
    async (params) => {
      try {
        const result = await segmentsService.create(params);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );
}