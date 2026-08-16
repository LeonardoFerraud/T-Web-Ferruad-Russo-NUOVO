import React, { useRef, useEffect } from 'react';

interface Spesa {
  id: number;
  provenienza: string;
  importo: number;
}

interface Props {
  dati: Spesa[];
}

// Palette di colori per le fette del grafico
const COLORI = [
  '#4f46e5', '#10b981', '#f59e0b', '#ef4444', 
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
];

export const GraficoTorta: React.FC<Props> = ({ dati }) => {
  // Riferimento all'elemento <canvas> nel DOM
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // totale aggregato (usato anche per la legenda)
  const totale = dati.reduce((acc, curr) => acc + curr.importo, 0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;


    const dpr = window.devicePixelRatio || 1;
    const { width, height } = canvas.getBoundingClientRect();

    if (width === 0 || height === 0) return;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, width, height);

    if (totale === 0) return;

    const centroX = width / 2;
    const centroY = height / 2;
    const raggio = Math.min(centroX, centroY) - 20;

    let angoloInizio = 0;

    dati.forEach((spesa, index) => {
      const percentuale = spesa.importo / totale;
      const angoloFetta = percentuale * 2 * Math.PI;
      const angoloFine = angoloInizio + angoloFetta;

      ctx.beginPath();
      ctx.moveTo(centroX, centroY);
      ctx.arc(centroX, centroY, raggio, angoloInizio, angoloFine);
      ctx.closePath();

      ctx.fillStyle = COLORI[index % COLORI.length];
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      angoloInizio = angoloFine;
    });
  }, [dati]);

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        style={{ border: '1px solid #e5e7eb', borderRadius: '8px', display: 'block', margin: '0 auto', maxWidth: '100%' }}
      />
      {/* Legenda: colore + provenienza + importo + percentuale */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12, marginTop: 12 }}>
        {dati.map((d, i) => {
          const colore = COLORI[i % COLORI.length];
          const perc = totale > 0 ? Math.round((d.importo / totale) * 100) : 0;
          return (
            <div key={d.provenienza} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 14, height: 14, background: colore, borderRadius: 3, boxShadow: '0 0 0 1px rgba(0,0,0,0.05) inset' }} />
              <div style={{ fontSize: 13, color: '#374151' }}>{d.provenienza} — € {d.importo.toFixed(2)} ({perc}%)</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};