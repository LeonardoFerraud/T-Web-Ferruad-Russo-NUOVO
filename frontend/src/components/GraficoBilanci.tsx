import React, { useMemo } from 'react';
import './GraficoBilanci.css';

interface GraficoBilanciProps {
    totaleEntrate: number;
    totaleSpese: number;
}

const GraficoBilanci: React.FC<GraficoBilanciProps> = ({ totaleEntrate, totaleSpese }) => {
    const bilancio = useMemo(() => {
        const entrate = Number(totaleEntrate) || 0;
        const spese = Number(totaleSpese) || 0;
        const differenza = entrate - spese;
        const massimo = Math.max(entrate, spese, 1);

        return {
            differenza,
            percentuale: Math.min(Math.abs(differenza) / massimo * 100, 100),
        };
    }, [totaleEntrate, totaleSpese]);

    const valoreFormattato = new Intl.NumberFormat('it-IT', {
        style: 'currency',
        currency: 'EUR',
    }).format(bilancio.differenza);

    return (
        <section className="grafico-bilanci" aria-labelledby="grafico-bilanci-titolo">
            <div className="grafico-bilanci__intestazione">
                <h3 id="grafico-bilanci-titolo">Bilancio</h3>
                <strong className={bilancio.differenza >= 0 ? 'positivo' : 'negativo'}>
                    {valoreFormattato}
                </strong>
            </div>

            <div className="grafico-bilanci__traccia" aria-label={`Differenza: ${valoreFormattato}`}>
                <div
                    className={`grafico-bilanci__barra ${bilancio.differenza >= 0 ? 'positivo' : 'negativo'}`}
                    style={{
                        width: `${bilancio.percentuale / 2}%`,
                        marginLeft: bilancio.differenza >= 0 ? '50%' : `${50 - bilancio.percentuale / 2}%`,
                    }}
                />
            </div>

            <div className="grafico-bilanci__etichette">
                <span>Spese: {totaleSpese.toFixed(2)} EUR</span>
                <span>Entrate: {totaleEntrate.toFixed(2)} EUR</span>
            </div>
        </section>
    );
};

export default GraficoBilanci;