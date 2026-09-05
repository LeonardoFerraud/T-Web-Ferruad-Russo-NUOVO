import { useState } from 'react';
import GraficoFondi from '../components/GraficoBarre';
import { useFondi } from '../hook/useFondi';
import './Fondi.css';

const Fondi = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const { listaFondi, aggiungiFondo, rimuoviFondo } = useFondi();
  const totale = listaFondi.reduce((sum, fondo) => sum + Number(fondo.value), 0);
  const save = async () => {
    if (!name || value === '') return;
    await aggiungiFondo(name, Number(value));
    setName(''); setValue('');
  };
  return <main className="fondi-page">
    <header className="fondi-page__hero">
      <div>
        <p className="fondi-page__eyebrow">Patrimonio</p>
        <h1>Fondi</h1>
      </div>
      <p>Organizza il capitale in contenitori chiari e segui come si distribuisce nel tempo.</p>
    </header>

    <section className="fondi-page__total">
      <span className="fondi-page__total-label">Capitale complessivo</span>
      <strong className="fondi-page__total-value">€ {totale.toFixed(2)}</strong>
    </section>

    <div className="fondi-page__workspace">
      <section className="fondi-page__panel">
        <h2>Nuovo fondo</h2>
        <p className="fondi-page__description">Crea uno spazio per una quota del tuo capitale.</p>
        <form className="fondi-page__form" onSubmit={(event) => { event.preventDefault(); void save(); }}>
          <label>Nome
            <input placeholder="Es. Emergenze" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>Valore
            <input type="number" min="0" step="0.01" placeholder="0,00" value={value} onChange={(e) => setValue(e.target.value)} />
          </label>
          <button className="fondi-page__primary-button" type="submit">Aggiungi fondo</button>
        </form>
      </section>

      <section className="fondi-page__panel fondi-page__chart">
        <h2>Distribuzione</h2>
        <p className="fondi-page__description">Il peso di ogni fondo sul capitale totale.</p>
        {listaFondi.length > 0 ? <GraficoFondi fondi={listaFondi.map((fondo) => ({ id: fondo.id, nome: fondo.name, valore: Number(fondo.value) }))} /> : <p className="fondi-page__empty">Nessun fondo presente.</p>}
      </section>

      <section className="fondi-page__panel fondi-page__list-panel">
        <h2>Fondi attivi</h2>
        <p className="fondi-page__description">Le quote di capitale che hai definito.</p>
        {listaFondi.length > 0 ? <ul className="fondi-page__list">
          {listaFondi.map((fondo) => <li className="fondi-page__item" key={fondo.id}>
            <span className="fondi-page__item-name">{fondo.name}</span>
            <span className="fondi-page__item-value">€ {Number(fondo.value).toFixed(2)}</span>
            <button className="fondi-page__remove-button" type="button" onClick={() => void rimuoviFondo(fondo.id)}>Rimuovi</button>
          </li>)}
        </ul> : <p className="fondi-page__empty">La lista dei fondi è ancora vuota.</p>}
      </section>
    </div>
  </main>;
};
export default Fondi;
