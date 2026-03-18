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
    "humand-connect": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "${deployUrl}?apiKey=TU_API_KEY"]
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
    "humand-connect": {
      "url": "${deployUrl}?apiKey=TU_API_KEY"
    }
  }
}`}
        </pre>
      </section>

    </main>
  );
}
