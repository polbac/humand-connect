# Humand MCP Server

MCP Server para la API de Humand - Módulos de Users y Time-Off.

## Requisitos

- Node.js 20+
- npm o yarn

## Instalación

```bash
cd humand-mcp-server
npm install
npm run build
```

## Configuración

1. Copia el archivo `.env.example` a `.env`:
```bash
cp .env.example .env
```

2. Configura tu API key en el archivo `.env`:
```
API_KEY=tu_api_key_aqui
REDASH_API_KEY=tu_redash_api_key_aqui
REDASH_URL=https://redash-dev.humand.co
HUMAND_API_BASE_URL=https://api.dev.humand.co/public/api/v1
```

## Uso Local (MCP Inspector)

Para probar el servidor localmente:

```bash
npm run inspector
```

Esto abrirá el MCP Inspector en tu navegador.

## Configuración en Claude Desktop

1. Edita el archivo de configuración de Claude Desktop:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`

2. Agrega la configuración del servidor:

```json
{
  "mcpServers": {
    "humand-mcp": {
      "command": "node",
      "args": ["/path/to/humand-mcp-server/dist/index.js"],
      "env": {
        "HUMAND_API_KEY": "tu_api_key",
        "HUMAND_API_BASE_URL": "https://api.dev.humand.co/public/api/v1"
      }
    }
  }
}
```

3. Reinicia Claude Desktop

## Configuración en Cursor

1. Ve a **Settings** → **Tools & Integrations**
2. Click en **Add Custom MCP Server**
3. Agrega la configuración:

```json
{
  "command": "node",
  "args": ["/path/to/humand-mcp-server/dist/index.js"],
  "env": {
    "HUMAND_API_KEY": "tu_api_key",
    "HUMAND_API_BASE_URL": "https://api.dev.humand.co/public/api/v1"
  }
}
```

## Herramientas Disponibles

### users_list
Lista usuarios con paginación y búsqueda opcional.

**Parámetros:**
- `limit` (número, opcional): Cantidad de usuarios por página (default: 10, max: 100)
- `page` (número, opcional): Número de página (default: 1)
- `search` (string, opcional): Búsqueda por nombre

**Ejemplo:**
```
Busca los primeros 20 usuarios con "pablo" en el nombre
```

### users_get
Obtiene un usuario por su employeeInternalId.

**Parámetros:**
- `employeeInternalId` (string, requerido): ID interno del empleado

**Ejemplo:**
```
Obtén el usuario con ID pablo.bacchetta@humand.co
```

### users_create
Crea un nuevo usuario.

**Parámetros:**
- `firstName` (string, requerido): Nombre
- `lastName` (string, requerido): Apellido
- `employeeInternalId` (string, requerido): ID interno del empleado
- `password` (string, requerido): Contraseña
- `email` (string, opcional): Email
- `nickname` (string, opcional): Apodo
- `phoneNumber` (string, opcional): Teléfono
- `birthdate` (string, opcional): Fecha de nacimiento (ISO)
- `hiringDate` (string, opcional): Fecha de contratación (ISO)

**Ejemplo:**
```
Crea un usuario llamado Juan Pérez con ID jperez
```

### users_update
Actualiza un usuario existente.

**Parámetros:**
- `employeeInternalId` (string, requerido): ID interno del empleado a actualizar
- `firstName` (string, opcional): Nombre
- `lastName` (string, opcional): Apellido
- `email` (string, opcional): Email
- `nickname` (string, opcional): Apodo
- `phoneNumber` (string, opcional): Teléfono
- `birthdate` (string, opcional): Fecha de nacimiento (ISO)
- `hiringDate` (string, opcional): Fecha de contratación (ISO)

**Ejemplo:**
```
Actualiza el usuario jperez cambiando su nombre a Juan Pedro
```

### timeoff_balances_list
Lista los saldos de time-off con paginación.

**Parámetros:**
- `limit` (número, opcional): Cantidad por página (default: 10, max: 100)
- `page` (número, opcional): Número de página (default: 1)
- `userId` (número, opcional): Filtrar por ID de usuario

**Ejemplo:**
```
Muéstrame los saldos de time-off
```

### timeoff_requests_list
Lista las solicitudes de time-off con paginación y filtros.

**Parámetros:**
- `limit` (número, opcional): Cantidad por página (default: 10, max: 100)
- `page` (número, opcional): Número de página (default: 1)
- `userId` (número, opcional): Filtrar por ID de usuario
- `status` (string, opcional): Filtrar por estado (APPROVED, REJECTED, PENDING)

**Ejemplo:**
```
Muéstrame las solicitudes de time-off pendientes
```

## Desarrollo

```bash
# Modo desarrollo (reload automático)
npm run dev

# Build
npm run build

# Start produção
npm run start
```

## Estructura del Proyecto

```
src/
├── index.ts              # Entry point del servidor MCP
├── config/
│   └── index.ts          # Configuración de variables de entorno
├── services/
│   ├── api.service.ts    # Cliente HTTP base
│   └── users.service.ts  # Servicio de users
├── modules/
│   └── users/
│       ├── users.module.ts    # Definición de herramientas MCP
│       ├── users.schemas.ts   # Esquemas Zod
│       └── users.types.ts     # Tipos TypeScript
```

## Licencia

MIT
