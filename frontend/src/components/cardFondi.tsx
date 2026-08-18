import { ReactNode } from 'react';
import './cardFondi.css';

interface CardFondiProps{
    name?: string;
    children: ReactNode;
    value?: number;
}

const CardFondi = ({ name, value, children }: CardFondiProps) => {
  return (
    <div className="card">
        {name && <h2>{name}</h2>}
        {value && <p>{value}</p>}
        {children}
    </div>
  );
};

export default CardFondi;