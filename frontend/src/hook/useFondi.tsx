import { useState, useEffect } from 'react';

export interface Fondo {
  id: number;
  name: string;
  value: number;
}

export const useFondi = () => {
  const [listaFondi, setListaFondi] = useState<Fondo[]>([]);
  const ricarica = () => fetch('/api/funds', { credentials: 'include' })
    .then((response) => response.ok ? response.json() : [])
    .then(setListaFondi);
  useEffect(() => { void ricarica(); }, []);

  const aggiungiFondo = async (name: string, value: number) => {
    const response = await fetch('/api/funds', {
      method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, value })
    });
    if (!response.ok) throw new Error('Impossibile salvare il fondo');
    await ricarica();
  };
  const rimuoviFondo = async (id: number) => {
    await fetch(`/api/funds/${id}`, { method: 'DELETE', credentials: 'include' });
    await ricarica();
  };

  return { listaFondi, aggiungiFondo, rimuoviFondo };
};