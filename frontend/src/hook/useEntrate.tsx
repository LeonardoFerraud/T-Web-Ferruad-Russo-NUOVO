import { useState, useEffect, useMemo} from 'react';

export interface Entrata {
  id: number;
  provenienza: string;
  importo: number;
}

export const useEntrate = () => {
  // RECUPERO DATI DA LOCAL STORAGE
  const [listaEntrate, setListaEntrate] = useState<Entrata[]>(() => {
    const saved = localStorage.getItem('mie-entrate');
    return saved ? JSON.parse(saved) : [];
  });

  // SALVATAGGIO AUTOMATICO
  useEffect(() => {
    localStorage.setItem('mie-entrate', JSON.stringify(listaEntrate));
  }, [listaEntrate]);

  // SINCRONIZZAZIONE TRA SCHEDE/FINESTRE
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('mie-entrate');
      if (saved) setListaEntrate(JSON.parse(saved));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // CALCOLO DEL TOTALE
  const totale = useMemo(() => {
    return listaEntrate.reduce((acc, curr) => acc + curr.importo, 0);
  }, [listaEntrate]);

  // ELABORAZIONE DATI PER IL GRAFICO
  const datiGrafico = useMemo(() => {
    const totalePerProvenienza = listaEntrate.reduce<Record<string, number>>((acc, entrata) => {
      acc[entrata.provenienza] = (acc[entrata.provenienza] || 0) + entrata.importo;
      return acc;
    }, {});

    const provenienzeUniche = Array.from(new Set(listaEntrate.map(s => s.provenienza)));

    return provenienzeUniche.map((prov, idx) => ({
      id: idx,
      provenienza: prov,
      importo: totalePerProvenienza[prov] ?? 0
    }));
  }, [listaEntrate]);

  return { 
    listaEntrate, 
    setListaEntrate, 
    totale, 
    datiGrafico 
  };
};