import { FormEvent, useState } from 'react';
import './Login.css';

interface LoginProps {
  onLogin: (user: User) => void;
}

export interface User {
  username: string;
  role: string;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [registering, setRegistering] = useState(false);
  const [role, setRole] = useState('USER');

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`/api/auth/${registering ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, role })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Credenziali non valide');
      if (registering) {
        setRegistering(false);
        setPassword('');
        setError('Registrazione completata. Ora puoi accedere.');
      } else {
        onLogin(data);
      }
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'Errore durante il login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <form className="login-panel" onSubmit={submit}>
        <p className="login-kicker">GestioneFinanze</p>
        <h1>{registering ? 'Crea un account' : 'Accedi al tuo spazio'}</h1>
        <p className="login-copy">{registering ? 'Registrati per creare un nuovo utente.' : 'Inserisci le tue credenziali per continuare.'}</p>
        <label>
          Nome utente
          <input value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
        </label>
        {registering && <label>
          Ruolo
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="USER">User (solo dashboard)</option>
            <option value="ADMIN">Admin (gestione dati)</option>
          </select>
        </label>}
        {error && <p className="login-error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Attendi...' : registering ? 'Registrati' : 'Accedi'}</button>
        <button type="button" className="secondary" onClick={() => { setRegistering(!registering); setError(''); }}>
          {registering ? 'Ho già un account' : 'Crea un account'}
        </button>
      </form>
    </main>
  );
};

export default Login;
