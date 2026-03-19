'use client';

import { useState } from 'react';

type Tab = 'instructions' | 'documentation';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('instructions');
  const localUrl = 'http://localhost:3000/api/mcp';
  const deployUrl = 'https://humand-mcp-server.vercel.app/api/mcp';

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
        marginBottom: '0'
      }}>
        <h1 style={{
          color: '#fff',
          margin: '0 auto',
          maxWidth: '800px'
        }}>Humand Connect MCP Server</h1>
      </div>

      <nav style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        padding: '0 2rem'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '2rem' }}>
          <button
            onClick={() => setActiveTab('instructions')}
            style={{
              background: 'none',
              border: 'none',
              padding: '1rem 0',
              fontSize: '1rem',
              fontWeight: activeTab === 'instructions' ? '600' : '400',
              color: activeTab === 'instructions' ? '#496BE3' : '#666',
              borderBottom: activeTab === 'instructions' ? '2px solid #496BE3' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Instrucciones
          </button>
          <button
            onClick={() => setActiveTab('documentation')}
            style={{
              background: 'none',
              border: 'none',
              padding: '1rem 0',
              fontSize: '1rem',
              fontWeight: activeTab === 'documentation' ? '600' : '400',
              color: activeTab === 'documentation' ? '#496BE3' : '#666',
              borderBottom: activeTab === 'documentation' ? '2px solid #496BE3' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Documentación
          </button>
        </div>
      </nav>

      <div style={{ padding: '0 2rem 2rem', maxWidth: '800px', margin: '0 auto' }}>

        {activeTab === 'instructions' && (
          <>
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
          </>
        )}

        {activeTab === 'documentation' && (
          <>
            <section style={{ marginTop: '1.5rem' }}>
              <h2>Esquemas de Datos</h2>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ color: '#496BE3' }}>User</h3>
                <p>Representa un usuario en el sistema de Humand.</p>
                <pre style={{
                  background: '#f5f5f5',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  border: '1px solid #e0e0e0'
                }}>
{`{
  id: number
  firstName: string
  lastName: string
  email: string | null
  employeeInternalId: string
  nickname: string | null
  phoneNumber: string | null
  birthdate: string | null
  hiringDate: string | null
  status: 'ACTIVE' | 'UNCLAIMED' | 'DEACTIVATED'
  deleted: boolean
  createdAt: string
  updatedAt: string
  fields: unknown[]
  relationships: { employeeInternalId: string, name: 'BOSS' | 'SUBORDINATE' }[]
  segmentations: { group: string, item: string }[]
  workdays: string[]
}`}
                </pre>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ color: '#496BE3' }}>TimeOffBalance</h3>
                <p>Saldos de tiempo libre (vacaciones, licencias, etc.).</p>
                <pre style={{
                  background: '#f5f5f5',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  border: '1px solid #e0e0e0'
                }}>
{`{
  amountRequested: number
  currentBalance: number
  cycle: { fromDate: string, toDate: string, title: string }
  policy: unknown
  policyType: unknown
  user: unknown
}`}
                </pre>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ color: '#496BE3' }}>TimeOffRequest</h3>
                <p>Solicitudes de tiempo libre realizadas por usuarios.</p>
                <pre style={{
                  background: '#f5f5f5',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  border: '1px solid #e0e0e0'
                }}>
{`{
  amountRequested: number
  amountInTime: number
  amountInMoney: number
  creator: unknown | null
  description: string | null
  from: { consumptionType: string, date: string, time: string | null }
  id: number
  issuer: unknown
  policyType: unknown
  rejectionReason: string | null
  requestPolicyId: number
  status: string
  to: { consumptionType: string, date: string, time: string | null }
  updatedAt: string
  userId: number
}`}
                </pre>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ color: '#496BE3' }}>JobPosition</h3>
                <p>Cargos/puestos de trabajo dentro de la organización.</p>
                <pre style={{
                  background: '#f5f5f5',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  border: '1px solid #e0e0e0'
                }}>
{`{
  id: number
  name: string
  description: string | null
  parentId: number | null
  departmentId: number | null
  status: 'ACTIVE' | 'INACTIVE'
  createdAt: string
  updatedAt: string
}`}
                </pre>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ color: '#496BE3' }}>JobPositionMember</h3>
                <p>Miembros asignados a un cargo/puesto.</p>
                <pre style={{
                  background: '#f5f5f5',
                  padding: '1rem',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  border: '1px solid #e0e0e0'
                }}>
{`{
  id: number
  userId: number
  jobPositionId: number
  employeeInternalId: string
  firstName: string
  lastName: string
  email: string | null
  status: string
  createdAt: string
}`}
                </pre>
              </div>
            </section>

            <section style={{ marginTop: '2.5rem' }}>
              <h2>Acciones Disponibles</h2>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ color: '#496BE3' }}>Lectura</h3>
                <p style={{ color: '#666' }}>Acciones para obtener información del sistema.</p>
                <ul style={{ paddingLeft: '1.5rem', color: '#444' }}>
                  <li style={{ marginBottom: '0.5rem' }}><strong>users_list</strong> - Lista usuarios con paginación y búsqueda opcional</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>users_get</strong> - Obtiene un usuario por su employeeInternalId</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>timeoff_balances_list</strong> - Lista los saldos de time-off con paginación</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>timeoff_requests_list</strong> - Lista las solicitudes de time-off con filtros</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>job_positions_list</strong> - Lista los cargos/puestos con paginación</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>job_positions_get</strong> - Obtiene un cargo por su ID</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>job_positions_members_list</strong> - Lista miembros de un cargo</li>
                </ul>
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ color: '#496BE3' }}>Estructura</h3>
                <p style={{ color: '#666' }}>Acciones para crear y modificar datos del sistema.</p>
                <ul style={{ paddingLeft: '1.5rem', color: '#444' }}>
                  <li style={{ marginBottom: '0.5rem' }}><strong>users_create</strong> - Crea un nuevo usuario</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>users_update</strong> - Actualiza un usuario existente</li>
                  <li style={{ marginBottom: '0.5rem' }}><strong>job_positions_update</strong> - Actualiza un cargo/puesto</li>
                </ul>
              </div>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
