import { useFondi } from '../hook/useFondi';
import { useEntrate } from '../hook/useEntrate';
import { useSpese } from '../hook/useSpese';
import GraficoFondi from '../components/GraficoBarre';
import GraficoBilanci from '../components/GraficoBilanci';
import { GraficoTorta } from '../components/torta';
import './Dashboard.css';

const Dashboard = () => {

    const { listaFondi } = useFondi();
    const { datiGrafico, totale: totaleEntrate } = useEntrate();
    const { datiGrafico: datiSpese, totale: totaleSpese } = useSpese();
    const bilancio = totaleEntrate - totaleSpese;
    const totaleFondi = listaFondi.reduce((totale, fondo) => totale + Number(fondo.value), 0);
    const formattaEuro = (valore: number) => new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    }).format(valore);

    return(
        <div className="dashboard">
            <header className="dashboard__hero">
                <div>
                    <p className="dashboard__eyebrow">Quadro finanziario</p>
                    <h1>Una lettura chiara delle tue finanze.</h1>
                </div>
                <p>Monitora il movimento del denaro e il capitale disponibile in un unico spazio.</p>
            </header>

            <section className="dashboard__metric-grid" aria-label="Riepilogo finanziario">
                <div className="dashboard__metric">
                    <span className="dashboard__metric-label">Entrate totali</span>
                    <strong className="dashboard__metric-value dashboard__metric-value--positive">{formattaEuro(totaleEntrate)}</strong>
                    <span className="dashboard__metric-note">Denaro registrato in entrata</span>
                </div>
                <div className="dashboard__metric">
                    <span className="dashboard__metric-label">Spese totali</span>
                    <strong className="dashboard__metric-value">{formattaEuro(totaleSpese)}</strong>
                    <span className="dashboard__metric-note">Uscite registrate</span>
                </div>
                <div className="dashboard__metric">
                    <span className="dashboard__metric-label">Saldo attuale</span>
                    <strong className={`dashboard__metric-value ${bilancio >= 0 ? 'dashboard__metric-value--positive' : 'dashboard__metric-value--negative'}`}>
                        {formattaEuro(bilancio)}
                    </strong>
                    <span className="dashboard__metric-note">Entrate meno spese</span>
                </div>
            </section>

            <div className="dashboard__content">
                <div className="dashboard__column">
                    <section className="dashboard__panel">
                        <div className="dashboard__panel-header">
                            <div>
                                <h2>Bilancio</h2>
                                <p className="dashboard__panel-description">La distanza tra ciò che entra e ciò che esce.</p>
                            </div>
                        </div>
                        <GraficoBilanci totaleEntrate={totaleEntrate} totaleSpese={totaleSpese} />
                    </section>

                    <section className="dashboard__panel">
                        <div className="dashboard__panel-header">
                            <div>
                                <h2>Capitale disponibile</h2>
                                <p className="dashboard__panel-description">Distribuzione dei fondi attualmente presenti.</p>
                            </div>
                            <strong>{formattaEuro(totaleFondi)}</strong>
                        </div>
                        <GraficoFondi fondi={listaFondi.map((fondo) => ({ id: fondo.id, nome: fondo.name, valore: Number(fondo.value) }))} />
                    </section>
                </div>

                <div className="dashboard__column">
                    <section className="dashboard__panel">
                        <div className="dashboard__panel-header">
                            <div>
                                <h2>Entrate</h2>
                                <p className="dashboard__panel-description">Da quali fonti arriva il denaro.</p>
                            </div>
                        </div>
                        {datiGrafico.length > 0 ? <GraficoTorta dati={datiGrafico} compatto /> : <p className="dashboard__empty">Nessuna entrata registrata.</p>}
                    </section>

                    <section className="dashboard__panel">
                        <div className="dashboard__panel-header">
                            <div>
                                <h2>Spese</h2>
                                <p className="dashboard__panel-description">Come viene distribuito il denaro.</p>
                            </div>
                        </div>
                        {datiSpese.length > 0 ? <GraficoTorta dati={datiSpese} compatto /> : <p className="dashboard__empty">Nessuna spesa registrata.</p>}
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;