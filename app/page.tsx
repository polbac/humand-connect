export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Humand Connect MCP Server</h1>
      <p>Use this endpoint with your MCP client:</p>
      <code style={{ 
        display: 'block', 
        padding: '1rem', 
        background: '#f4f4f4', 
        borderRadius: '4px',
        margin: '1rem 0'
      }}>
        /api/mcp
      </code>
      <p>Connect to: <code>https://your-deployment.vercel.app/api/mcp</code></p>
    </main>
  );
}
