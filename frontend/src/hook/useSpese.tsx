import { useEffect, useMemo, useState } from 'react';

export interface Spesa { id: number; source: string; amount: number; date: string; }

export const useSpese = () => {
  const [listaSpese, setListaSpese] = useState<Spesa[]>([]);
  const ricarica = () => fetch('/api/expenses', { credentials: 'include' })
    .then((response) => response.ok ? response.json() : [])
    .then(setListaSpese);
  useEffect(() => { void ricarica(); }, []);
  const aggiungiSpesa = async (source: string, amount: number, date: string) => {
    const response = await fetch('/api/expenses', {
      method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source, amount, date })
    });
    if (!response.ok) throw new Error('Impossibile salvare la spesa');
    await ricarica();
  };
  const rimuoviSpesa = async (id: number) => {
    await fetch(`/api/expenses/${id}`, { method: 'DELETE', credentials: 'include' });
    await ricarica();
  };
  const totale = useMemo(() => listaSpese.reduce((sum, item) => sum + Number(item.amount), 0), [listaSpese]);
  const datiGrafico = useMemo(() => listaSpese.map((item) => ({ id: item.id, provenienza: item.source, importo: Number(item.amount) })), [listaSpese]);
  return { listaSpese, totale, datiGrafico, aggiungiSpesa, rimuoviSpesa };
};