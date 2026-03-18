#!/usr/bin/env node

import { spawn } from 'child_process';

const API_KEY = process.env.HUMAND_API_KEY || '';
const MCP_URL = process.env.MCP_REMOTE_URL || process.argv[2] || 'http://localhost:3000/api/mcp';

const args = ['-y', 'mcp-remote', MCP_URL];

console.log('Starting MCP server with headers...');
console.log('URL:', MCP_URL);

const proc = spawn('npx', args, {
  stdio: ['pipe', 'pipe', 'pipe'],
  env: {
    ...process.env,
    MCP_REMOTE_URL: MCP_URL,
  },
});

proc.stdout.on('data', (data) => {
  process.stdout.write(data);
});

proc.stderr.on('data', (data) => {
  process.stderr.write(data);
});

process.stdin.pipe(proc.stdin);

proc.on('close', (code) => {
  process.exit(code || 0);
});
