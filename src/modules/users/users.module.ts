import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { usersService } from '../../services/users.service.js';

const listSchema = {
  limit: z.number().min(1).max(100).default(10).describe('Number of users per page'),
  page: z.number().min(1).default(1).describe('Page number'),
  search: z.string().optional().describe('Search by name (firstName or lastName)'),
} as const;

const getSchema = {
  employeeInternalId: z.string().min(1).describe('The employee internal ID'),
} as const;

const createSchema = {
  firstName: z.string().min(1).describe('User first name'),
  lastName: z.string().min(1).describe('User last name'),
  employeeInternalId: z.string().min(1).describe('Employee internal ID'),
  password: z.string().min(1).describe('User password'),
  email: z.string().email().optional().describe('User email'),
  nickname: z.string().optional().describe('User nickname'),
  phoneNumber: z.string().optional().describe('User phone number'),
  birthdate: z.string().optional().describe('User birthdate (ISO date)'),
  hiringDate: z.string().optional().describe('User hiring date (ISO date)'),
} as const;

const updateSchema = {
  employeeInternalId: z.string().min(1).describe('Employee internal ID to update'),
  firstName: z.string().optional().describe('User first name'),
  lastName: z.string().optional().describe('User last name'),
  email: z.string().email().optional().describe('User email'),
  nickname: z.string().optional().describe('User nickname'),
  phoneNumber: z.string().optional().describe('User phone number'),
  birthdate: z.string().optional().describe('User birthdate (ISO date)'),
  hiringDate: z.string().optional().describe('User hiring date (ISO date)'),
} as const;

export function registerUsersModule(server: McpServer) {
  // users_list
  server.tool(
    'users_list',
    'List users from Humand with pagination and optional search',
    listSchema,
    async (params) => {
      try {
        const result = await usersService.list(params);
        return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
      } catch (error) {
        return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
      }
    }
  );

  // Aliases
  server.tool('colaboradores_list', 'Lista colaboradores de Humand con paginación y búsqueda', listSchema, async (params) => {
    const result = await usersService.list(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('empleados_list', 'Lista empleados de Humand con paginación y búsqueda', listSchema, async (params) => {
    const result = await usersService.list(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('trabajadores_list', 'Lista trabajadores de Humand con paginación y búsqueda', listSchema, async (params) => {
    const result = await usersService.list(params);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });

  // users_get
  server.tool('users_get', 'Get a single user by employeeInternalId', getSchema, async (params) => {
    try {
      const result = await usersService.get(params.employeeInternalId);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
    }
  });

  // Aliases
  server.tool('colaborador_get', 'Obtiene un colaborador por su employeeInternalId', getSchema, async (params) => {
    const result = await usersService.get(params.employeeInternalId);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('empleado_get', 'Obtiene un empleado por su employeeInternalId', getSchema, async (params) => {
    const result = await usersService.get(params.employeeInternalId);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('trabajador_get', 'Obtiene un trabajador por su employeeInternalId', getSchema, async (params) => {
    const result = await usersService.get(params.employeeInternalId);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });

  // users_create
  server.tool('users_create', 'Create a new user in Humand', createSchema, async (data) => {
    try {
      const result = await usersService.create(data);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
    }
  });

  // Aliases
  server.tool('colaborador_create', 'Crea un nuevo colaborador en Humand', createSchema, async (data) => {
    const result = await usersService.create(data);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('empleado_create', 'Crea un nuevo empleado en Humand', createSchema, async (data) => {
    const result = await usersService.create(data);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('trabajador_create', 'Crea un nuevo trabajador en Humand', createSchema, async (data) => {
    const result = await usersService.create(data);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });

  // users_update
  server.tool('users_update', 'Update an existing user in Humand', updateSchema, async (data) => {
    const { employeeInternalId, ...updateData } = data;
    try {
      const result = await usersService.update(employeeInternalId, updateData);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    } catch (error) {
      return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
    }
  });

  // Aliases
  server.tool('colaborador_update', 'Actualiza un colaborador existente en Humand', updateSchema, async (data) => {
    const { employeeInternalId, ...updateData } = data;
    const result = await usersService.update(employeeInternalId, updateData);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('empleado_update', 'Actualiza un empleado existente en Humand', updateSchema, async (data) => {
    const { employeeInternalId, ...updateData } = data;
    const result = await usersService.update(employeeInternalId, updateData);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
  server.tool('trabajador_update', 'Actualiza un trabajador existente en Humand', updateSchema, async (data) => {
    const { employeeInternalId, ...updateData } = data;
    const result = await usersService.update(employeeInternalId, updateData);
    return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
  });
}
