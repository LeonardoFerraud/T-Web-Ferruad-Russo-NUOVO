import { useState } from 'react';
import { GraficoTorta } from '../components/torta';
import { Card } from '../components/card';
import { useEntrate } from '../hook/useEntrate';

const Entrate = () => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const { listaEntrate, totale, datiGrafico, aggiungiEntrata, rimuoviEntrata } = useEntrate();
  const save = async () => {
    if (!source || !amount) return;
    await aggiungiEntrata(source, Number(amount), new Date().toISOString().slice(0, 10));
    setSource(''); setAmount('');
  };
  return <>
    <Card title="Entrate">
        <input placeholder="Fonte dell'entrata" value={source} onChange={(e) => setSource(e.target.value)} />
        <input type="number" min="0.01" placeholder="Importo" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={() => void save()}>Salva</button>
    </Card>
    <Card title="Rappresentazione delle entrate">
        <GraficoTorta dati={datiGrafico} />
    </Card>
    <Card title="Entrate">
        <table>
            <thead>
                <tr>
                    <th>Provenienza</th>
                    <th>Importo</th>
                    <th>Azioni</th>
                </tr>
            </thead>
            <tbody>
                {listaEntrate.map((item) => (
                    <tr key={item.id}>
                        <td>{item.source}</td>
                        <td>€ {Number(item.amount).toFixed(2)}</td>
                        <td>
                            <button onClick={() => void rimuoviEntrata(item.id)}>Rimuovi</button>
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
    </Card>
  </>;
};
export default Entrate;
