import react from "react";
import { useState, useEffect, useMemo } from 'react';
import {Card} from "../components/card";
import "./Entrate.css";

interface Entrata {
  id: number;
  provenienza: string;
  importo: number;
  data: number;
}

const Entrate = () => {
  // 1. Stato
  const [listaEntrate, setListaEntrate] = useState<Entrata[]>(() => {
    const saved = localStorage.getItem('mie-entrate');
    return saved ? JSON.parse(saved) : [];
  });

  const [provenienza, setProvenienza] = useState('');
  const [importo, setImporto] = useState('');
  const [data, setData] = useState('');

  // 2. Persistenza
  useEffect(() => {
    localStorage.setItem('mie-entrate', JSON.stringify(listaEntrate));
  }, [listaEntrate]);

  // 3. Calcoli ottimizzati (useMemo)

  // A. Totale generale di tutte le entrate
  const totale = useMemo(() => 
    listaEntrate.reduce((acc, curr) => acc + curr.importo, 0), 
  [listaEntrate]);

  // B. Lista aggregata FILTRATA PER L'ANNO CORRENTE
  const listaAggregataAnno = useMemo(() => {
    const annoCorrente = new Date().getFullYear();
    
    // 1. Filtriamo prima la lista per anno
    const entrateFiltrate = listaEntrate.filter(item => {
      return new Date(item.data).getFullYear() === annoCorrente;
    });

    // 2. Applichiamo il tuo raggruppamento esistente
    const raggruppamento = entrateFiltrate.reduce((acc: Record<string, number>, item) => {
      acc[item.provenienza] = (acc[item.provenienza] || 0) + item.importo;
      return acc;
    }, {});
    
    return Object.entries(raggruppamento).map(([prov, tot]) => ({
      provenienza: prov,
      totale: tot,
    }));
  }, [listaEntrate]);

  // C. Lista aggregata FILTRATA PER IL MESE CORRENTE (dello stesso anno)
  const listaAggregataMeseCorrente = useMemo(() => {
    const oggi = new Date();
    const annoCorrente = oggi.getFullYear();
    const meseCorrente = oggi.getMonth(); // 0 = Gennaio, 7 = Agosto (nel 2026)

    // 1. Filtriamo prima la lista per anno e mese
    const entrateFiltrate = listaEntrate.filter(item => {
      const d = new Date(item.data);
      return d.getFullYear() === annoCorrente && d.getMonth() === meseCorrente;
    });

    // 2. Applichiamo il tuo raggruppamento esistente
    const raggruppamento = entrateFiltrate.reduce((acc: Record<string, number>, item) => {
      acc[item.provenienza] = (acc[item.provenienza] || 0) + item.importo;
      return acc;
    }, {});
    
    return Object.entries(raggruppamento).map(([prov, tot]) => ({
      provenienza: prov,
      totale: tot,
    }));
  }, [listaEntrate]);

  // 4. Gestione Eventi
  const aggiungiEntrata = () => {
    if (!provenienza || !importo) return;

    const nuovaEntrata: Entrata = {
      id: Date.now(),
      provenienza,
      importo: Number(importo),
      data: Date.now(),
    };

    setListaEntrate([...listaEntrate, nuovaEntrata]);
    setProvenienza('');
    setImporto('');
    setData('');
  };

  const rimuoviProvenienza = (provenienzaDaRimuovere: string) => {
    setListaEntrate(prev => prev.filter(item => item.provenienza !== provenienzaDaRimuovere));
  };

  // 5. Render
  return (
    <>
      <Card title="Entrate">
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
      </Card>
      
      {/* Altre Card... */}
      <Card title="Entrate Mensili">
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
              {listaAggregataMeseCorrente.map((item) => (
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
      <Card title="Entrate Annuali">
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
              {listaAggregataAnno.map((item) => (
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
    </>
  );
};

export default Entrate;