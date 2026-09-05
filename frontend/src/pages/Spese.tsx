import { useState } from 'react';
import { GraficoTorta } from '../components/torta';
import { Card } from '../components/card';
import { useSpese } from '../hook/useSpese';

const Spese = () => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const { listaSpese, totale, datiGrafico, aggiungiSpesa, rimuoviSpesa } = useSpese();
  const save = async () => {
    if (!source || !amount) return;
    await aggiungiSpesa(source, Number(amount), new Date().toISOString().slice(0, 10));
    setSource(''); setAmount('');
  };
  return <>
    <Card title="Spese">
        <input placeholder="Fonte della spesa" value={source} onChange={(e) => setSource(e.target.value)} />
        <input type="number" min="0.01" placeholder="Importo" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <button onClick={() => void save()}>Salva</button>
    </Card>
    <Card title="Rappresentazione delle spese">
        <GraficoTorta dati={datiGrafico} />
    </Card>
    <Card title="Spese">
        <table>
            <thead><tr>
                <th>Provenienza</th>
                <th>Importo</th>
                <th>Azioni</th>
                </tr>
            </thead>
            <tbody>{listaSpese.map((item) => <tr key={item.id}><td>{item.source}</td>
                <td>€ {Number(item.amount).toFixed(2)}</td><td>
                    <button onClick={() => void rimuoviSpesa(item.id)}>Rimuovi</button>
                </td></tr>)}
            </tbody>
            <tfoot>
                <tr><td><strong>TOTALE</strong></td><td><strong>€ {totale.toFixed(2)}</strong>
                </td></tr>
            </tfoot>
            </table>
            </Card>
  </>;
};
export default Spese;
