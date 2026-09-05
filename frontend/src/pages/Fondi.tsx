import { useState } from 'react';
import CardFondi from '../components/cardFondi';
import GraficoFondi from '../components/GraficoBarre';
import { useFondi } from '../hook/useFondi';

const Fondi = () => {
  const [name, setName] = useState('');
  const [value, setValue] = useState('');
  const { listaFondi, aggiungiFondo, rimuoviFondo } = useFondi();
  const save = async () => {
    if (!name || value === '') return;
    await aggiungiFondo(name, Number(value));
    setName(''); setValue('');
  };
  return <div>
            <CardFondi>
                <input placeholder="Nome del fondo" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" min="0" placeholder="Valore" value={value} onChange={(e) => setValue(e.target.value)} />
                <button onClick={() => void save()}>Salva</button>
            </CardFondi>
            {listaFondi.length === 0 ? 
            <p>Nessun fondo presente.</p> : listaFondi.map((fondo) => 
            <CardFondi key={fondo.id} name={fondo.name} value={Number(fondo.value)}>
                <button onClick={() => void rimuoviFondo(fondo.id)}>Rimuovi</button>
            </CardFondi>)}
            <GraficoFondi fondi={listaFondi.map((fondo) => ({ id: fondo.id, nome: fondo.name, valore: Number(fondo.value) }))} />

         </div>;
};
export default Fondi;
