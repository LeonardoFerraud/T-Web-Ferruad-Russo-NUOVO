import react from "react";
import { useState, useEffect, useMemo } from 'react';
import {Card} from "../components/card";
import "./Entrate.css";

interface Entrata {
  id: number;
  provenienza: string;
  importo: number;
}

const Entrate = () => {
  // 1. Stato
  const [listaEntrate, setListaEntrate] = useState<Entrata[]>(() => {
    const saved = localStorage.getItem('mie-entrate');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [provenienza, setProvenienza] = useState('');
  const [importo, setImporto] = useState('');

  // 2. Persistenza
  useEffect(() => {
    localStorage.setItem('mie-entrate', JSON.stringify(listaEntrate));
  }, [listaEntrate]);

  // 3. Calcoli ottimizzati (useMemo)
  // Vengono ricalcolati solo se listaEntrate cambia
  const totale = useMemo(() => 
    listaEntrate.reduce((acc, curr) => acc + curr.importo, 0), 
  [listaEntrate]);

  const listaAggregata = useMemo(() => {
    const raggruppamento = listaEntrate.reduce((acc: Record<string, number>, item) => {
      acc[item.provenienza] = (acc[item.provenienza] || 0) + item.importo;
      return acc;
    }, {});
    
    return Object.entries(raggruppamento).map(([prov, tot]) => ({
      provenienza: prov,
      totale: tot
    }));
  }, [listaEntrate]);

  // 4. Gestione Eventi
  const aggiungiEntrata = () => {
    if (!provenienza || !importo) return;
    
    const nuovaEntrata: Entrata = {
      id: Date.now(),
      provenienza,
      importo: Number(importo)
    };

    setListaEntrate([...listaEntrate, nuovaEntrata]);
    setProvenienza('');
    setImporto('');
  };

  const rimuoviProvenienza = (provenienzaDaRimuovere: string) => {
    setListaEntrate(prev => prev.filter(item => item.provenienza !== provenienzaDaRimuovere));
  };

  // 5. Render
  return (
    <>
      <Card title="Entrate Mensili">
        <input 
          placeholder="Provenienza (es. Stipendio)" 
          value={provenienza} 
          onChange={(e) => setProvenienza(e.target.value)} 
        />
        <input 
          type="number" 
          placeholder="Importo" 
          value={importo} 
          onChange={(e) => setImporto(e.target.value)} 
        />
        <button onClick={aggiungiEntrata}>Salva</button>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Provenienza</th>
                <th>Totale</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              {listaAggregata.map((item) => (
                <tr key={item.provenienza}>
                  <td>{item.provenienza}</td>
                  <td>€ {item.totale.toFixed(2)}</td>
                  <td>
                    <button onClick={() => rimuoviProvenienza(item.provenienza)}>Rimuovi</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><strong>TOTALE</strong></td>
                <td><strong>€ {totale.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
      
      {/* Altre Card... */}
    </>
  );
};

export default Entrate;