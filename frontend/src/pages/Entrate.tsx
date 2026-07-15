import react from "react";
import { useState } from 'react';
import {Card} from "../components/card";
import "./Entrate.css";

const Entrate = () => {

    const [entrateMensili, setEntrateMensili] = useState<number[]>([]);
    const [input, setInput] = useState("");

    const handleAddEntrateMensili = (nuovaEntrata: number) => {
        setEntrateMensili([...entrateMensili, nuovaEntrata]);
        setInput(""); // Resetta l'input dopo aver aggiunto l'entrata
    };

    return(
        <>
            <Card title="Entrate mensili">
                <p>Qua puoi caricare le tue entrate mensili</p>
                <input type="number" placeholder="Inserisci guadagno" value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={() => handleAddEntrateMensili(parseFloat(input) || 0)}>Aggiungi Entrata</button>
            </Card>
            <Card title="Entrate annuali">
                <p>Qua puoi visualizzare le tue entrate annuali</p>
            </Card>
            <Card title="Guadagno medio mensile">
                <p>Qua puoi visualizzare il tuo guadagno medio mensile</p>
            </Card>
        </>
    );
};

export default Entrate;