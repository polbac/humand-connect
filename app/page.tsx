export default function Home() {
  const localUrl = 'http://localhost:3000/api/mcp';
  const deployUrl = 'https://humand-mcp-server.vercel.app/api/mcp';
  const apiKeyPlaceholder = 'TU_API_KEY_AQUI';

  return (
    <main style={{ 
      backgroundColor: '#f8f8f8',
      fontFamily: 'var(--font-roboto), Roboto, sans-serif',
      minHeight: '100vh',
      lineHeight: '1.6'
    }}>
      <div style={{
        background: 'linear-gradient(180deg, #21283E 0%, #496BE3 100%)',
        padding: '1.5rem 2rem',
        marginBottom: '1rem'
      }}>
        <h1 style={{ 
          color: '#fff', 
          margin: '0 auto', 
          maxWidth: '800px'
        }}>Humand Connect MCP Server</h1>
      </div>
      
      <div style={{ padding: '0 2rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ position: 'relative', paddingBottom: '64.86161251504213%', height: 0, marginTop: '1.5rem', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe 
            src="https://www.loom.com/embed/0c918a88d3b944cdbc1363f7fac8e4db" 
            frameBorder={0}
            allowFullScreen
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          />
        </div>

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
      </div>

    </main>
  );
}
