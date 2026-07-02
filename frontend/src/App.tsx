import { useEffect, useMemo, useState } from 'react';
import LoginPanel from './components/LoginPanel';
import Dashboard from './components/Dashboard';
import { UserRole } from './types';

type SessionUser = {
  username: string;
  role: UserRole;
};

function App() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('session-user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const isAdmin = useMemo(() => user?.role === 'ADMIN', [user]);

  const handleLogin = (username: string, role: UserRole) => {
    const nextUser = { username, role };
    localStorage.setItem('session-user', JSON.stringify(nextUser));
    setUser(nextUser);
    setMessage('Accesso effettuato');
  };

  const handleLogout = () => {
    localStorage.removeItem('session-user');
    setUser(null);
    setMessage('Disconnessione completata');
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Gestione progetti</h1>
        <p>Struttura iniziale per il progetto web con autenticazione semplificata.</p>
      </header>

      {message ? <div className="status-banner">{message}</div> : null}

      {!user ? (
        <LoginPanel onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} isAdmin={isAdmin} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
