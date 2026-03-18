import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';
import { UsersService } from '../../../lib/users.service';
import { TimeOffService } from '../../../lib/time-off.service';
import { DepartmentsService } from '../../../lib/departments.service';
import { JobPositionsService } from '../../../lib/job-positions.service';
import { SegmentsService } from '../../../lib/segments.service';
import { setConnectionConfig, getCurrentConfig } from '../../../lib/api.service';
import { cookies } from 'next/headers';

const TOOLS_AVAILABLE = `
TOOLS DISPONIBLES EN HUMAND CONNECT

USERS - Gestion de Usuarios
- users_list, users_get, users_create, users_update

TIME-OFF - Gestion de Licencias
- timeoff_balances_list, timeoff_requests_list, timeoff_requests_update_state

JOB-POSITIONS - Gestion de Posiciones
- job_positions_list, job_position_get, job_position_members, job_position_update

DEPARTMENTS - Gestion de Departamentos
- departments_list, department_get, department_members, department_children

SEGMENTS - Gestion de Segmentos
- segments_list, segments_get, segments_create
`;

const connectionSchema = z.object({
  apiKey: z.string().min(1).describe('API Key para Humand (Base64 encoded)'),
  baseUrl: z.string().url().describe('URL base de la API de Humand'),
});

const listSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
  search: z.string().optional(),
});

const getUserSchema = z.object({
  employeeInternalId: z.string().min(1),
});

const createUserSchema = z.object({
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

const updateUserSchema = z.object({
  employeeInternalId: z.string().min(1),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  nickname: z.string().optional(),
  phoneNumber: z.string().optional(),
  birthdate: z.string().optional(),
  hiringDate: z.string().optional(),
});

const listBalancesSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
  employeeInternalId: z.string().optional(),
});

const listRequestsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
  employeeInternalId: z.string().optional(),
  status: z.string().optional(),
});

const updateRequestStateSchema = z.object({
  requestId: z.number(),
  state: z.enum(['APPROVED', 'REJECTED']),
  comment: z.string().optional(),
});

const listDepartmentsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
});

const getByIdSchema = z.object({
  id: z.number(),
});

const listPositionsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
});

const updatePositionSchema = z.object({
  id: z.number(),
  name: z.string().optional(),
  description: z.string().nullable().optional(),
  parentId: z.number().nullable().optional(),
  departmentId: z.number().nullable().optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).optional(),
});

const listSegmentsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  page: z.number().min(1).default(1),
});

const createSegmentSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
});

const emptySchema = z.object({});

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'connect_config',
      {
        title: 'Configure Connection',
        description: 'Configura la conexión a la API de Humand (apiKey y baseUrl). Debe llamarse antes de usar otras herramientas.',
        inputSchema: connectionSchema,
      },
      async ({ apiKey, baseUrl }) => {
        setConnectionConfig({ apiKey, baseUrl });
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({ 
            message: 'Conexión configurada correctamente',
            connected: true,
          }, null, 2) }],
        };
      }
    );

    server.registerTool(
      'connect_status',
      {
        title: 'Connection Status',
        description: 'Muestra el estado actual de la conexión',
        inputSchema: emptySchema,
      },
      async () => {
        const config = getCurrentConfig();
        return {
          content: [{ type: 'text' as const, text: JSON.stringify({
            connected: !!config.apiKey && !!config.baseUrl,
            message: !!config.apiKey && !!config.baseUrl 
              ? 'Conexión activa' 
              : 'Revisar configuración',
          }, null, 2) }],
        };
      }
    );

    server.registerTool(
      'connect_capabilities',
      {
        title: 'Connect Capabilities',
        description: 'Muestra las capacidades y herramientas disponibles en Humand Connect',
        inputSchema: emptySchema,
      },
      async () => ({
        content: [{ type: 'text' as const, text: `HUMAND CONNECT\n\n${TOOLS_AVAILABLE}` }],
      })
    );

    server.registerTool(
      'users_list',
      {
        title: 'List Users',
        description: 'List users from Humand with pagination and optional search',
        inputSchema: listSchema,
      },
      async ({ limit, page, search }) => {
        try {
          const service = new UsersService();
          const result = await service.list({ limit, page, search });
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'colaboradores_list',
      {
        title: 'Lista Colaboradores',
        description: 'Lista colaboradores de Humand con paginación y búsqueda',
        inputSchema: listSchema,
      },
      async ({ limit, page, search }) => {
        try {
          const service = new UsersService();
          const result = await service.list({ limit, page, search });
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'users_get',
      {
        title: 'Get User',
        description: 'Get a single user by employeeInternalId',
        inputSchema: getUserSchema,
      },
      async ({ employeeInternalId }) => {
        try {
          const service = new UsersService();
          const result = await service.get(employeeInternalId);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'colaborador_get',
      {
        title: 'Obtener Colaborador',
        description: 'Obtiene un colaborador por su employeeInternalId',
        inputSchema: getUserSchema,
      },
      async ({ employeeInternalId }) => {
        try {
          const service = new UsersService();
          const result = await service.get(employeeInternalId);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'users_create',
      {
        title: 'Create User',
        description: 'Create a new user in Humand',
        inputSchema: createUserSchema,
      },
      async (data) => {
        try {
          const service = new UsersService();
          const result = await service.create(data);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'users_update',
      {
        title: 'Update User',
        description: 'Update an existing user in Humand',
        inputSchema: updateUserSchema,
      },
      async (data) => {
        const { employeeInternalId, ...updateData } = data;
        try {
          const service = new UsersService();
          const result = await service.update(employeeInternalId, updateData);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'timeoff_balances_list',
      {
        title: 'List Time-Off Balances',
        description: 'List time-off balances from Humand with pagination',
        inputSchema: listBalancesSchema,
      },
      async ({ limit, page, employeeInternalId }) => {
        try {
          const service = new TimeOffService();
          const result = await service.getBalances({ limit, page, employeeInternalId });
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'timeoff_requests_list',
      {
        title: 'List Time-Off Requests',
        description: 'List time-off requests from Humand with pagination and optional filters',
        inputSchema: listRequestsSchema,
      },
      async ({ limit, page, employeeInternalId, status }) => {
        try {
          const service = new TimeOffService();
          const result = await service.getRequests({ limit, page, employeeInternalId, status });
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'timeoff_requests_update_state',
      {
        title: 'Update Time-Off Request State',
        description: 'Approve or reject a time-off request from Humand',
        inputSchema: updateRequestStateSchema,
      },
      async ({ requestId, state, comment }) => {
        try {
          const service = new TimeOffService();
          const result = await service.updateRequestState(requestId, state, comment);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'departments_list',
      {
        title: 'List Departments',
        description: 'List all departments from Humand with pagination',
        inputSchema: listDepartmentsSchema,
      },
      async ({ limit, page }) => {
        try {
          const service = new DepartmentsService();
          const result = await service.list({ limit, page });
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'departamento_get',
      {
        title: 'Obtener Departamento',
        description: 'Obtiene un departamento por su ID',
        inputSchema: getByIdSchema,
      },
      async ({ id }) => {
        try {
          const service = new DepartmentsService();
          const result = await service.get(id);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'department_members',
      {
        title: 'Get Department Members',
        description: 'Get members of a department by ID',
        inputSchema: getByIdSchema,
      },
      async ({ id }) => {
        try {
          const service = new DepartmentsService();
          const result = await service.members(id);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'department_children',
      {
        title: 'Get Department Children',
        description: 'Get child departments of a department by ID',
        inputSchema: getByIdSchema,
      },
      async ({ id }) => {
        try {
          const service = new DepartmentsService();
          const result = await service.children(id);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'job_positions_list',
      {
        title: 'List Job Positions',
        description: 'List all job positions from Humand with pagination',
        inputSchema: listPositionsSchema,
      },
      async ({ limit, page }) => {
        try {
          const service = new JobPositionsService();
          const result = await service.list({ limit, page });
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'job_position_get',
      {
        title: 'Get Job Position',
        description: 'Get a single job position by ID',
        inputSchema: getByIdSchema,
      },
      async ({ id }) => {
        try {
          const service = new JobPositionsService();
          const result = await service.get(id);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'job_position_members',
      {
        title: 'Get Job Position Members',
        description: 'Get members of a job position by ID',
        inputSchema: getByIdSchema,
      },
      async ({ id }) => {
        try {
          const service = new JobPositionsService();
          const result = await service.members(id);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'job_position_update',
      {
        title: 'Update Job Position',
        description: 'Update an existing job position in Humand',
        inputSchema: updatePositionSchema,
      },
      async ({ id, ...data }) => {
        try {
          const service = new JobPositionsService();
          const result = await service.update(id, data);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'segments_list',
      {
        title: 'List Segments',
        description: 'List all segments from Humand with pagination',
        inputSchema: listSegmentsSchema,
      },
      async ({ limit, page }) => {
        try {
          const service = new SegmentsService();
          const result = await service.list({ limit, page });
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'segmento_get',
      {
        title: 'Obtener Segmento',
        description: 'Obtiene un segmento por su ID',
        inputSchema: getByIdSchema,
      },
      async ({ id }) => {
        try {
          const service = new SegmentsService();
          const result = await service.get(id);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );

    server.registerTool(
      'segments_create',
      {
        title: 'Create Segment',
        description: 'Create a new segment in Humand',
        inputSchema: createSegmentSchema,
      },
      async (data) => {
        try {
          const service = new SegmentsService();
          const result = await service.create(data);
          return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
        } catch (error) {
          return { content: [{ type: 'text' as const, text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` }] };
        }
      }
    );
  },
  {
    serverInfo: { name: 'humand-mcp-server', version: '1.0.0' },
  },
  { basePath: '/api', verboseLogs: true }
);

async function configHandler(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const queryApiKey = url.searchParams.get('apiKey');
  const cookieStore = await cookies();
  const cookieApiKey = cookieStore.get('mcp_apiKey')?.value;

  const apiKey = queryApiKey || cookieApiKey;

  if (apiKey) {
    const current = getCurrentConfig();
    setConnectionConfig({ apiKey, baseUrl: current.baseUrl });
  }

  return handler(request);
}

export { configHandler as GET, configHandler as POST };
