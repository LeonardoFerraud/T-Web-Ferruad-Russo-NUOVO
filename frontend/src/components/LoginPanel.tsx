import { useState, type FormEvent } from 'react';
import { UserRole } from '../types';

type LoginPanelProps = {
  onLogin: (username: string, role: UserRole) => void;
};

function LoginPanel({ onLogin }: LoginPanelProps) {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<UserRole>('USER');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!username.trim()) return;
    onLogin(username.trim(), role);
  };

  return (
    <section className="panel">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome utente
          <input value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
          Ruolo
          <select value={role} onChange={(event) => setRole(event.target.value as UserRole)}>
            <option value="USER">Utente</option>
            <option value="ADMIN">Amministratore</option>
          </select>
        </label>
        <button type="submit">Accedi</button>
      </form>
    </section>
  );
}

export default LoginPanel;
