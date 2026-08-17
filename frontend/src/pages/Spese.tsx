import { useState, useEffect, useMemo } from 'react';
import { GraficoTorta } from '../components/torta';
import {Card} from "../components/card";

interface Spesa{
    id: number;
    provenienza: string;
    importo: number;
}

const Spese = () => {

    const [provenienza, setProvenienza] = useState('');
    const [importo, setImporto] = useState('');

    //RECUPERO DATI DA LOCAL STOR
    const [listaSpese, setListaSpese] = useState<Spesa[]>(() => {
        const saved = localStorage.getItem('mie-spese');
        return saved ? JSON.parse(saved) : [];
    });

    //SALVATAGGIO AUTOMATICO QUANDO "listaSpese" CAMBIA
    useEffect(() => {
        localStorage.setItem('mie-spese', JSON.stringify(listaSpese));
    }, [listaSpese]);

    //MEMORIZZA I VALORI DI "listaSpese" E AGGIORNA IL TOTALE QUANDO CAMBIA
    const totale = useMemo(() => 
        listaSpese.reduce((acc, curr) => acc + curr.importo, 0), 
    [listaSpese]);

    //FUNZIONE PER L'INSERIMENTO DELLE SPESE (arrow function assegnata alla costante "aggiungiSpesa")
    //COME FUNZIONA setListaSpese():
        //--> Con "pre =>" fa una callback per andare ad aggiornare i dati più recenti dell'array con le spese
        //--> Con "...prev" crea una copia dell'array perchè in react non si può fare una semplice push()
        //--> Con il contenuto di {...} definiamo un nuovo oggetto spesa
    const aggiungiSpesa = () => {
        if(!importo) return;
        setListaSpese(prev => [...prev, { id: Date.now(), provenienza, importo: +importo }]);
        setProvenienza('');
        setImporto('');
    }

    //RAGGRUPPA LE SPESE UGUALI con il ciclo reduce a cui viene passato l'oggetto <provenienza,valore>, acc sta per accumulatore
    const totalePerProvenienza = listaSpese.reduce<Record<string, number>>((acc, spesa) => {
        acc[spesa.provenienza] = (acc[spesa.provenienza] || 0) + spesa.importo;
        return acc;
    }, {}); // {} oggetto vuoto con cui parte l'accumulatore

    //LISTA DELLE PROVENIENZE UNICHE (usata per mostrare ogni provenienza una sola volta)
    const provenienzeUniche = Array.from(new Set(listaSpese.map(spesa => spesa.provenienza)));

    //DATI AGGREGATI PER IL GRAFICO: una voce per ogni provenienza
    const datiGrafico = provenienzeUniche.map((prov, idx) => ({
        id: idx,
        provenienza: prov,
        importo: totalePerProvenienza[prov] ?? 0
    }));

    return(
        <>
            <Card title="Spese">
                <input 
                    placeholder="Fonte della spesa" 
                    value={provenienza} 
                    onChange={(e) => setProvenienza(e.target.value)} 
                />
                <input 
                    type="number" 
                    placeholder="Importo" 
                    value={importo} 
                    onChange={(e) => setImporto(e.target.value)} 
                />
                <button onClick={aggiungiSpesa}>Salva</button>
            </Card>

            <Card title="Rappresentazione delle spese">
                {listaSpese.length > 0 ? (
                    <GraficoTorta dati={datiGrafico} />
                ) : (
                    <p>Nessuna spesa da mostrare</p>
                )}
            </Card>

            <Card title="Spese">
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
                                    <button onClick={() => setListaSpese(prev => prev.filter(item => item.provenienza !== prov))}>Rimuovi</button>
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

export default Spese;