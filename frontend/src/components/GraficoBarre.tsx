import React, { useMemo } from 'react';
import './GraficoBarre.css';


interface Fondo {
    id: number;
    nome: string;
    valore: number;
}

interface GraficoFondiProps {
    fondi: Fondo[];
}

const GraficoFondi: React.FC<GraficoFondiProps> = ({ fondi }) => {
    // Calcolo del valore massimo per definire le proporzioni delle barre
    const maxValore = useMemo(() => {
        if (fondi.length === 0) return 1;
        const max = Math.max(...fondi.map((f) => f.valore));
        return max > 0 ? max : 1;
    }, [fondi]);

    if (fondi.length === 0) return null;

    return (
        <section className="grafico-fondi" aria-labelledby="grafico-fondi-titolo">
            <h3 id="grafico-fondi-titolo">Grafico Fondi</h3>
            <div className="grafico-fondi__lista">
                {fondi.map((fondo) => (
                    <div className="grafico-fondi__riga" key={fondo.id}>
                        <span className="grafico-fondi__nome">
                            {fondo.nome}
                        </span>
                        <div className="grafico-fondi__traccia">
                            <div
                                className="grafico-fondi__barra"
                                style={{ width: `${(fondo.valore / maxValore) * 100}%` }}
                            />
                        </div>
                        <span className="grafico-fondi__valore">{fondo.valore}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default GraficoFondi;