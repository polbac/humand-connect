export default function Home() {
  const localUrl = 'http://localhost:3000/api/mcp';
  const deployUrl = 'https://humand-mcp-server.vercel.app/api/mcp';
  const apiKeyPlaceholder = 'TU_API_KEY_AQUI';

  return (
    <main style={{ 
      padding: '2rem', 
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      lineHeight: '1.6'
    }}>
      <h1>Humand Connect MCP Server</h1>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>URLs de Conexión</h2>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Local:</strong>
          <code style={{ display: 'block', padding: '0.5rem', background: '#f4f4f4', borderRadius: '4px', marginTop: '0.25rem' }}>
            {localUrl}?apiKey={apiKeyPlaceholder}
          </code>
        </div>
        <div>
          <strong>Producción:</strong>
          <code style={{ display: 'block', padding: '0.5rem', background: '#f4f4f4', borderRadius: '4px', marginTop: '0.25rem' }}>
            {deployUrl}?apiKey={apiKeyPlaceholder}
          </code>
        </div>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Configuración Claude Desktop</h2>
        <p>Archivo: <code>~/Library/Application Support/Claude/claude_desktop_config.json</code></p>
        
        <h3>Opción 1: Usando mcp-remote (Recomendado)</h3>
        <pre style={{ 
          background: '#1e1e1e', 
          color: '#d4d4d4', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.875rem'
        }}>
{`{
  "mcpServers": {
    "humand-local": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "${localUrl}?apiKey=TU_API_KEY"]
    },
    "humand-prod": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "${deployUrl}?apiKey=TU_API_KEY"]
    }
  }
}`}
        </pre>

        <h3>Opción 2: Conexión directa (solo producción)</h3>
        <pre style={{ 
          background: '#1e1e1e', 
          color: '#d4d4d4', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.875rem'
        }}>
{`{
  "mcpServers": {
    "humand": {
      "url": "${deployUrl}",
      "headers": {
        "X-API-Key": "TU_API_KEY"
      }
    }
  }
}`}
        </pre>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Configuración Cursor</h2>
        <p>Archivo: <code>~/.cursor/mcp.json</code></p>
        <pre style={{ 
          background: '#1e1e1e', 
          color: '#d4d4d4', 
          padding: '1rem', 
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '0.875rem'
        }}>
{`{
  "mcpServers": {
    "humand-local": {
      "url": "${localUrl}?apiKey=TU_API_KEY"
    },
    "humand-prod": {
      "url": "${deployUrl}?apiKey=TU_API_KEY"
    }
  }
}`}
        </pre>
      </section>

      <section style={{ marginTop: '2rem', padding: '1rem', background: '#fff3cd', borderRadius: '4px' }}>
        <h3>Notas Importantes</h3>
        <ul>
          <li>Reemplazá <code>TU_API_KEY</code> con tu API key de Humand (Base64)</li>
          <li>Para local: ejecutá <code>npm run dev</code> antes de conectar</li>
          <li>La <code>HUMAND_API_BASE_URL</code> se configura en variables de entorno de Vercel</li>
          <li>Reiniciá Claude/Cursor después de cambiar la configuración</li>
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Herramientas Disponibles</h2>
        <ul>
          <li><strong>connect_config</strong> - Configurar conexión (ya no necesario si usas headers)</li>
          <li><strong>connect_status</strong> - Verificar estado de conexión</li>
          <li><strong>connect_capabilities</strong> - Listar capacidades</li>
          <li><strong>users_*</strong> - Gestión de usuarios</li>
          <li><strong>timeoff_*</strong> - Gestión de licencias</li>
          <li><strong>departments_*</strong> - Gestión de departamentos</li>
          <li><strong>job_positions_*</strong> - Gestión de posiciones</li>
          <li><strong>segments_*</strong> - Gestión de segmentos</li>
        </ul>
      </section>
    </main>
  );
}
