import { useState, useEffect, useMemo } from 'react';
import { GraficoTorta } from '../components/torta';
import {Card} from "../components/card";
import { useEntrate } from '../hook/useEntrate';

interface Entrata{
    id: number;
    provenienza: string;
    importo: number;
}

const Entrate = () => {

  const [provenienza, setProvenienza] = useState('');
  const [importo, setImporto] = useState('');

  const { listaEntrate, setListaEntrate, totale, datiGrafico } = useEntrate();

  useEffect(() => {
    localStorage.setItem('mie-entrate', JSON.stringify(listaEntrate));
  }, [listaEntrate]);

  const aggiungiEntrata = () => {
    if(!importo) return;
    setListaEntrate(prev => [...prev, { id: Date.now(), provenienza, importo: +importo }]);
    setProvenienza('');
    setImporto('');
  }

  const totalePerProvenienza = listaEntrate.reduce<Record<string, number>>((acc, entrata) => {
    acc[entrata.provenienza] = (acc[entrata.provenienza] || 0) + entrata.importo;
    return acc;
  }, {});

  const provenienzeUniche = Array.from(new Set(listaEntrate.map(s => s.provenienza)));

  return(
    <>
      <Card title="Entrate">
        <input 
          placeholder="Fonte dell'entrata" 
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

      <Card title="Rappresentazione delle entrate">
        {listaEntrate.length > 0 ? (
          <GraficoTorta dati={datiGrafico} />
        ) : (
          <p>Nessuna entrata da mostrare</p>
        )}
      </Card>

      <Card title="Entrate">
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
              {provenienzeUniche.map((prov) => (
                  <tr key={prov}>
                      <td>{prov}</td>
                      <td>€ {(totalePerProvenienza[prov] ?? 0).toFixed(2)}</td>
                      <td>
                          <button onClick={() => setListaEntrate(prev => prev.filter(item => item.provenienza !== prov))}>Rimuovi</button>
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
}

export default Entrate;