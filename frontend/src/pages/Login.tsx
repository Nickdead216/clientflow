import { useState } from 'react';
import api from '../services/api';

type LoginProps = {
  onLogin: () => void;
};

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.access_token);
      alert('Login exitoso');
      onLogin();
    } catch (err) {
      alert('Error en login');
    }
  };

  return (
    <div className="page-container">
      <div className="card">
        <h1>ClientFlow</h1>
        <p className="subtitle">Inicia sesión para ver tus clientes y proyectos</p>

        <div className="form-group">
          <label>Email</label>
          <input
            placeholder="nico2@test.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            placeholder="••••••"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" onClick={handleLogin}>
          Entrar
        </button>
      </div>
    </div>
  );
}