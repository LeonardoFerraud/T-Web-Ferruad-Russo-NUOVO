import { useState, useEffect, useMemo } from 'react';
import CardFondi from "../components/cardFondi";
import GraficoFondi from '../components/GraficoBarre';

interface Fondi{
    id: number;
    nome: string;
    valore: number;
} 

const Fondi = () => {

    const [nome, setNome] = useState('');
    const [valore, setValore] = useState('');

    //RECUPERO DATI DA LOCAL STOR
    const [listaFondi, setListaFondi] = useState<Fondi[]>(() => {
        const saved = localStorage.getItem('miei-fondi');
        return saved ? JSON.parse(saved) : [];
    });

    //SALVATAGGIO AUTOMATICO QUANDO "listaFondi" CAMBIA
    useEffect(() => {
        localStorage.setItem('miei-fondi', JSON.stringify(listaFondi));
    }, [listaFondi]);

    const creaFondo = () => {
        if(!nome) return;
        setListaFondi(prev => [...prev, { id: Date.now(), nome, valore: Number(valore) }]);
        setNome('');
        setValore('');
    }

    const rimuoviFondo = (idDaRimuovere: string | number) => {
        setListaFondi(listaFondi.filter((fondo) => fondo.id !== idDaRimuovere));
    };

    return(
        <div>
            <CardFondi>
                    <input 
                    placeholder="Nome del fondo" 
                    value={nome} 
                    onChange={(e) => setNome(e.target.value)} 
                    />
                    <input 
                    type="number" 
                    placeholder="Valore" 
                    value={valore} 
                    onChange={(e) => setValore(e.target.value)} 
                    />
                    <button onClick={creaFondo}>Salva</button>
            </CardFondi>

            {listaFondi.length === 0 ? (
                <p>Nessun fondo presente. Clicca sul pulsante per aggiungerne uno.</p>
            ) : (
                listaFondi.map((fondo) => (
                <CardFondi
                    key={fondo.id}
                    name={fondo.nome}
                    value={fondo.valore}
                >
                    <button onClick={() => rimuoviFondo(fondo.id)}>Rimuovi</button>
                </CardFondi>
                ))
            )}

            <GraficoFondi fondi={listaFondi} />

        </div>
    );
}

export default Fondi;