import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { featureService } from '../../services/feature.service.js';

const listSchema = {
  limit: z.number().min(1).max(100).default(10).describe('Number of items per page'),
  page: z.number().min(1).default(1).describe('Page number'),
} as const;

const getSchema = {
  id: z.string().min(1).describe('Item ID'),
} as const;

const createSchema = {
  name: z.string().min(1).describe('Resource name'),
  description: z.string().optional().describe('Resource description'),
} as const;

const updateSchema = {
  id: z.string().min(1).describe('Item ID to update'),
  name: z.string().min(1).optional().describe('Resource name'),
  description: z.string().optional().describe('Resource description'),
} as const;

const deleteSchema = {
  id: z.string().min(1).describe('Item ID to delete'),
} as const;

export function registerFeatureModule(server: McpServer) {
  server.tool('feature_list', 'List all items', listSchema, async (params) => {
    try {
      const result = await featureService.list(params);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
    }
  });

  server.tool('feature_list_es', 'Lista todos los items', listSchema, async (params) => {
    const result = await featureService.list(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });

  server.tool('feature_get', 'Get item by ID', getSchema, async (params) => {
    try {
      const result = await featureService.get(params.id);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
    }
  });

  server.tool('feature_get_es', 'Obtiene item por ID', getSchema, async (params) => {
    const result = await featureService.get(params.id);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });

  server.tool('feature_create', 'Create a new item', createSchema, async (data) => {
    try {
      const result = await featureService.create(data);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
    }
  });

  server.tool('feature_create_es', 'Crea un nuevo item', createSchema, async (data) => {
    const result = await featureService.create(data);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });

  server.tool('feature_update', 'Update an existing item', updateSchema, async (data) => {
    const { id, ...updateData } = data;
    try {
      const result = await featureService.update(id, updateData);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
    }
  });

  server.tool('feature_update_es', 'Actualiza un item existente', updateSchema, async (data) => {
    const { id, ...updateData } = data;
    const result = await featureService.update(id, updateData);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });

  server.tool('feature_delete', 'Delete an item', deleteSchema, async (params) => {
    try {
      await featureService.delete(params.id);
      return { content: [{ type: 'text' as const, text: JSON.stringify({ success: true, message: 'Item deleted successfully' }) }] };
    } catch (error) {
      return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
    }
  });

  server.tool('feature_delete_es', 'Elimina un item', deleteSchema, async (params) => {
    await featureService.delete(params.id);
    return { content: [{ type: 'text' as const, text: JSON.stringify({ success: true, message: 'Item eliminado' }) }] };
  });
}
