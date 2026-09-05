import { useEffect, useState } from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import Navbar from './components/navBar';
import Entrate from './pages/Entrate';
import Spese from './pages/Spese';
import Fondi from './pages/Fondi';
import Dashboard from './pages/Dashboard';
import Login, { User } from './pages/Login';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((response) => response.ok ? response.json() : null)
      .then((currentUser) => setUser(currentUser))
      .finally(() => setCheckingSession(false));
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
  };

  if (checkingSession) return <div className="loading-screen">Caricamento...</div>;
  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <Navbar user={user} onLogout={logout} />
      
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {user.role === 'ADMIN' && <>
            <Route path="/Entrate" element={<Entrate />} />
            <Route path="/Spese" element={<Spese />} />
            <Route path="/Fondi" element={<Fondi />} />
          </>}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;