import { useState } from 'react';
import { GraficoTorta } from '../components/torta';
import { useEntrate } from '../hook/useEntrate';
import './Movimenti.css';

const Entrate = () => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const { listaEntrate, totale, datiGrafico, aggiungiEntrata, rimuoviEntrata } = useEntrate();
  const save = async () => {
    if (!source || !amount) return;
    await aggiungiEntrata(source, Number(amount), new Date().toISOString().slice(0, 10));
    setSource(''); setAmount('');
  };
    return <main className="movimenti-page">
        <header className="movimenti-page__hero">
            <div>
                <p className="movimenti-page__eyebrow">Movimenti finanziari</p>
                <h1>Entrate</h1>
            </div>
            <p>Registra le fonti di guadagno e osserva come contribuiscono al tuo equilibrio finanziario.</p>
        </header>

        <section className="movimenti-page__total">
            <span className="movimenti-page__total-label">Entrate complessive</span>
            <strong className="movimenti-page__total-value">€ {totale.toFixed(2)}</strong>
        </section>

        <div className="movimenti-page__workspace">
            <section className="movimenti-page__panel">
                <h2>Nuova entrata</h2>
                <p className="movimenti-page__panel-description">Aggiungi un movimento al tuo registro.</p>
                <form className="movimenti-page__form" onSubmit={(event) => { event.preventDefault(); void save(); }}>
                    <label>Fonte
                        <input placeholder="Es. Stipendio" value={source} onChange={(e) => setSource(e.target.value)} />
                    </label>
                    <label>Importo
                        <input type="number" min="0.01" step="0.01" placeholder="0,00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </label>
                    <button className="movimenti-page__primary-button" type="submit">Aggiungi entrata</button>
                </form>
            </section>

            <section className="movimenti-page__panel movimenti-page__chart">
                <h2>Distribuzione</h2>
                <p className="movimenti-page__panel-description">Il peso di ogni fonte sul totale.</p>
                {datiGrafico.length > 0 ? <GraficoTorta dati={datiGrafico} /> : <p className="movimenti-page__empty">Nessuna entrata registrata.</p>}
            </section>

            <section className="movimenti-page__panel movimenti-page__table-panel">
                <h2>Registro entrate</h2>
                <p className="movimenti-page__panel-description">Tutti i movimenti inseriti.</p>
                {listaEntrate.length > 0 ? <div className="movimenti-page__table-wrap"><table className="movimenti-page__table">
                    <thead><tr><th>Provenienza</th><th>Importo</th><th>Azioni</th></tr></thead>
                    <tbody>{listaEntrate.map((item) => <tr key={item.id}>
                        <td>{item.source}</td>
                        <td>€ {Number(item.amount).toFixed(2)}</td>
                        <td><button className="movimenti-page__remove-button" type="button" onClick={() => void rimuoviEntrata(item.id)}>Rimuovi</button></td>
                    </tr>)}</tbody>
                    <tfoot><tr><td><strong>Totale</strong></td><td><strong>€ {totale.toFixed(2)}</strong></td><td /></tr></tfoot>
                </table></div> : <p className="movimenti-page__empty">Il registro è ancora vuoto.</p>}
            </section>
        </div>
    </main>;
};
export default Entrate;
