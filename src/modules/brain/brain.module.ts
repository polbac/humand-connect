import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const AVAILABLE_SCHEMAS = `
SCHEMAS DISPONIBLES EN HUMAND CONNECT

USERS (Usuarios)
- UserSchema
- UsersListResponseSchema
- UsersListParamsSchema
- UserGetParamsSchema
- UserCreateSchema
- UserUpdateSchema

TIME-OFF (Licencias/Ausencias)
- TimeOffBalanceSchema
- TimeOffRequestSchema
- TimeOffBalancesResponseSchema
- TimeOffRequestsResponseSchema
- TimeOffBalancesParamsSchema
- TimeOffRequestsParamsSchema

JOB-POSITIONS (Posiciones de Trabajo)
- JobPositionSchema
- PaginatedJobPositionListSchema
- JobPositionListParamsSchema
- JobPositionByIdParamsSchema
- JobPositionMemberSchema
- PaginatedJobPositionMemberListSchema
- UpdateJobPositionSchema
`;

const TOOLS_AVAILABLE = `
TOOLS DISPONIBLES EN HUMAND CONNECT

USERS - Gestion de Usuarios
- users_list / colaboradores_list / empleados_list / trabajadores_list
- users_get / colaborador_get / empleado_get / trabajador_get
- users_create / colaborador_create / empleado_create / trabajador_create
- users_update / colaborador_update / empleado_update / trabajadores_update

TIME-OFF - Gestion de Licencias
- time_off_balances / licencias_saldo
- time_off_requests / licencias_solicitudes

JOB-POSITIONS - Gestion de Posiciones
- job_positions_list / posiciones_list
- job_position_get / posicion_get
- job_position_members / posicion_miembros
- job_position_update / posicion_actualizar

CONNECT - Informacion del Sistema
- connect_capabilities / connect_schemas / connect_info
`;

export function registerConnectModule(server: McpServer) {
  const emptySchema = {};

  server.tool(
    'connect_capabilities',
    'Muestra las capacidades y herramientas disponibles en Humand Connect',
    emptySchema,
    async () => {
      return {
        content: [{ type: 'text' as const, text: `HUMAND CONNECT\n\n${AVAILABLE_SCHEMAS}\n\n${TOOLS_AVAILABLE}` }],
      };
    }
  );

  server.tool(
    'connect_schemas',
    'Muestra los schemas disponibles en Humand Connect',
    emptySchema,
    async () => {
      return {
        content: [{ type: 'text' as const, text: `HUMAND CONNECT\n\n${AVAILABLE_SCHEMAS}` }],
      };
    }
  );

  server.tool(
    'connect_info',
    'Informacion general sobre Humand Connect',
    emptySchema,
    async () => {
      return {
        content: [{ type: 'text' as const, text: 'HUMAND CONNECT - Servidor MCP para la API de Humand' }],
      };
    }
  );
}
