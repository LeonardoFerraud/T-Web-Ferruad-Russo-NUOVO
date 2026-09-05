import { useState } from 'react';
import { GraficoTorta } from '../components/torta';
import { useSpese } from '../hook/useSpese';
import './Movimenti.css';

const Spese = () => {
    const [source, setSource] = useState('');
    const [amount, setAmount] = useState('');
    const { listaSpese, totale, datiGrafico, aggiungiSpesa, rimuoviSpesa } = useSpese();
    const save = async () => {
        if (!source || !amount) return;
        await aggiungiSpesa(source, Number(amount), new Date().toISOString().slice(0, 10));
        setSource(''); setAmount('');
    };

    return <main className="movimenti-page movimenti-page--spese">
        <header className="movimenti-page__hero">
            <div>
                <p className="movimenti-page__eyebrow">Movimenti finanziari</p>
                <h1>Spese</h1>
            </div>
            <p>Registra le uscite e individua con immediatezza dove si concentra il tuo budget.</p>
        </header>

        <section className="movimenti-page__total">
            <span className="movimenti-page__total-label">Spese complessive</span>
            <strong className="movimenti-page__total-value">€ {totale.toFixed(2)}</strong>
        </section>

        <div className="movimenti-page__workspace">
            <section className="movimenti-page__panel">
                <h2>Nuova spesa</h2>
                <p className="movimenti-page__panel-description">Aggiungi un movimento al tuo registro.</p>
                <form className="movimenti-page__form" onSubmit={(event) => { event.preventDefault(); void save(); }}>
                    <label>Fonte
                        <input placeholder="Es. Affitto" value={source} onChange={(e) => setSource(e.target.value)} />
                    </label>
                    <label>Importo
                        <input type="number" min="0.01" step="0.01" placeholder="0,00" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </label>
                    <button className="movimenti-page__primary-button" type="submit">Aggiungi spesa</button>
                </form>
            </section>

            <section className="movimenti-page__panel movimenti-page__chart">
                <h2>Distribuzione</h2>
                <p className="movimenti-page__panel-description">Il peso di ogni voce sul totale.</p>
                {datiGrafico.length > 0 ? <GraficoTorta dati={datiGrafico} /> : <p className="movimenti-page__empty">Nessuna spesa registrata.</p>}
            </section>

            <section className="movimenti-page__panel movimenti-page__table-panel">
                <h2>Registro spese</h2>
                <p className="movimenti-page__panel-description">Tutti i movimenti inseriti.</p>
                {listaSpese.length > 0 ? <div className="movimenti-page__table-wrap"><table className="movimenti-page__table">
                    <thead><tr><th>Provenienza</th><th>Importo</th><th>Azioni</th></tr></thead>
                    <tbody>{listaSpese.map((item) => <tr key={item.id}>
                        <td>{item.source}</td>
                        <td>€ {Number(item.amount).toFixed(2)}</td>
                        <td><button className="movimenti-page__remove-button" type="button" onClick={() => void rimuoviSpesa(item.id)}>Rimuovi</button></td>
                    </tr>)}</tbody>
                    <tfoot><tr><td><strong>Totale</strong></td><td><strong>€ {totale.toFixed(2)}</strong></td><td /></tr></tfoot>
                </table></div> : <p className="movimenti-page__empty">Il registro è ancora vuoto.</p>}
            </section>
        </div>
    </main>;
};
export default Spese;
