import { useEffect, useMemo, useState } from 'react';

export interface Entrata {
  id: number;
  source: string;
  amount: number;
  date: string;
}

export const useEntrate = () => {
  // RECUPERO DATI DA LOCAL STORAGE
  const [listaEntrate, setListaEntrate] = useState<Entrata[]>([]);
  const ricarica = () => fetch('/api/incomes', { credentials: 'include' })
    .then((response) => response.ok ? response.json() : [])
    .then(setListaEntrate);

  useEffect(() => { void ricarica(); }, []);

  const aggiungiEntrata = async (source: string, amount: number, date: string) => {
    const response = await fetch('/api/incomes', {
      method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source, amount, date })
    });
    if (!response.ok) throw new Error('Impossibile salvare l entrata');
    await ricarica();
  };

  const rimuoviEntrata = async (id: number) => {
    await fetch(`/api/incomes/${id}`, { method: 'DELETE', credentials: 'include' });
    await ricarica();
  };

  // CALCOLO DEL TOTALE
  const totale = useMemo(() => {
    return listaEntrate.reduce((acc, curr) => acc + Number(curr.amount), 0);
  }, [listaEntrate]);

  // ELABORAZIONE DATI PER IL GRAFICO
  const datiGrafico = useMemo(() => {
    return listaEntrate.map((entrata) => ({ id: entrata.id, provenienza: entrata.source, importo: Number(entrata.amount) }));
  }, [listaEntrate]);

  return { 
    listaEntrate, totale, datiGrafico, aggiungiEntrata, rimuoviEntrata
  };
};