import { ReactNode } from 'react';
import './card.css';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export const Card = ({ title, children, className = '' }: CardProps) => {
  return (
    <div className={`card ${className}`}>
            {title && <h2>{title}</h2>} {/* L'h2 appare solo se title ha un valore */}
            <div>{children}</div>
    </div>
  );
};