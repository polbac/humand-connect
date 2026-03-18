#!/usr/bin/env node

import 'dotenv/config';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { config } from './config/index.js';
import { registerUsersModule } from './modules/users/users.module.js';
import { registerTimeOffModule } from './modules/time-off/time-off.module.js';
import { registerJobPositionsModule } from './modules/job-positions/job-positions.module.js';
import { registerDepartmentsModule } from './modules/departments/departments.module.js';
import { registerConnectModule } from './modules/brain/brain.module.js';
import { registerSegmentsModule } from './modules/segments/segments.module.js';

const server = new McpServer({
  name: 'humand-mcp-server',
  version: '1.0.0',
});

registerUsersModule(server);
registerTimeOffModule(server);
registerJobPositionsModule(server);
registerDepartmentsModule(server);
registerConnectModule(server);
registerSegmentsModule(server);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Humand MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});
