import { useState, useEffect } from 'react';

export interface Fondo {
  id: number;
  nome: string;
  valore: number;
}

export const useFondi = () => {
  const [listaFondi, setListaFondi] = useState<Fondo[]>(() => {
    const saved = localStorage.getItem('miei-fondi');
    return saved ? JSON.parse(saved) : [];
  });

  // Salva ogni volta che listaFondi cambia
  useEffect(() => {
    localStorage.setItem('miei-fondi', JSON.stringify(listaFondi));
  }, [listaFondi]);

  // Sincronizza se i dati cambiano in un'altra scheda/finestra
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('miei-fondi');
      if (saved) setListaFondi(JSON.parse(saved));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return { listaFondi, setListaFondi };
};