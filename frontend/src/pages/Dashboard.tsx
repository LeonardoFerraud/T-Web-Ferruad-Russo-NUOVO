import { useFondi } from '../hook/useFondi';
import { useEntrate } from '../hook/useEntrate';
import { useSpese } from '../hook/useSpese';
import GraficoFondi from '../components/GraficoBarre';
import { GraficoTorta } from '../components/torta';

const Dashboard = () => {

    const { listaFondi } = useFondi();
    const { datiGrafico } = useEntrate();
    const { totale: totaleSpese, datiGrafico: datiSpese } = useSpese();

    return(
        <div className="dashboard">
            <h3>Il tuo guadagno attuale</h3>
            <GraficoTorta dati={datiGrafico} compatto />
            <h3>Le tue spese attuali: € {totaleSpese.toFixed(2)}</h3>
            <GraficoTorta dati={datiSpese} compatto />
            <h3>Capitale disponibile</h3>
            <GraficoFondi fondi={listaFondi.map((fondo) => ({ id: fondo.id, nome: fondo.name, valore: Number(fondo.value) }))} />
        </div>
    );
}

export default Dashboard;

//FIX importazione grafico