import { useState, useEffect, useMemo } from 'react';
import { useFondi } from '../hook/useFondi';
import { useEntrate } from '../hook/useEntrate';
import GraficoFondi from '../components/GraficoBarre';
import GraficoEntrate from '../components/torta';

const Dashboard = () => {

    const { listaFondi } = useFondi();

    return(
        <div>
            <h3>Il tuo guadagno attuale</h3>
            <GraficoEntrate dati={datiGrafico} />
            <h3>Le tue spese attuali</h3>
            <h3>Capitale disponibile</h3>
            <GraficoFondi fondi={listaFondi} />
        </div>
    );
}

export default Dashboard;

//FIX importazione grafico