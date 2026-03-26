import { useEffect, useState } from 'react';
import api from '../services/api';

type Client = {
  id: number;
  name: string;
  email?: string;
  company?: string;
};

type Project = {
  id: number;
  name: string;
  description?: string;
  status: string;
  clientId: number;
  client?: {
    id: number;
    name: string;
  };
};

export default function Dashboard() {
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [clientsRes, projectsRes] = await Promise.all([
          api.get('/clients'),
          api.get('/projects'),
        ]);

        setClients(clientsRes.data);
        setProjects(projectsRes.data);
      } catch (error) {
        console.error('Error cargando dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="loading">Cargando dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>ClientFlow Dashboard</h1>
        <p>Resumen simple de clientes y proyectos.</p>
      </div>

      <div className="grid">
        <section className="panel">
          <h2>Clientes</h2>
          {clients.length === 0 ? (
            <p className="muted">No hay clientes registrados.</p>
          ) : (
            <ul className="clean-list">
              {clients.map((client) => (
                <li key={client.id}>
                  <strong>{client.name}</strong>
                  {client.company && <span className="badge">{client.company}</span>}
                  <div className="muted">{client.email || 'Sin correo'}</div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel">
          <h2>Proyectos</h2>
          {projects.length === 0 ? (
            <p className="muted">No hay proyectos registrados.</p>
          ) : (
            <ul className="clean-list">
              {projects.map((project) => (
                <li key={project.id}>
                  <strong>{project.name}</strong>
                  <span className="badge">{project.status}</span>
                  <div className="muted">
                    Cliente: {project.client?.name || 'Sin cliente'}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}