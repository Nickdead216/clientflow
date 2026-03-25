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
    return <h2>Cargando...</h2>;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>ClientFlow Dashboard</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>Clientes</h2>
        {clients.length === 0 ? (
          <p>No hay clientes</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {clients.map((client) => (
              <li key={client.id} style={{ marginBottom: '0.75rem' }}>
                <strong>{client.name}</strong>
                {client.company ? ` - ${client.company}` : ''}
                {client.email ? ` - ${client.email}` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Proyectos</h2>
        {projects.length === 0 ? (
          <p>No hay proyectos</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {projects.map((project) => (
              <li key={project.id} style={{ marginBottom: '0.75rem' }}>
                <strong>{project.name}</strong> - {project.status}
                {project.client ? ` - Cliente: ${project.client.name}` : ''}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}