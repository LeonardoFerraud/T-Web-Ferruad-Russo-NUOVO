import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';
import { User } from '../pages/Login';

interface NavbarProps {
  user: User;
  onLogout: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">👤 GestioneFinanze</Link>
      </div>
      
      <ul className="navbar-links">
        <li><Link to="/">Dashboard</Link></li>
        {user.role === 'ADMIN' && <>
          <li><Link to="/Entrate">Entrate</Link></li>
          <li><Link to="/Spese">Spese</Link></li>
          <li><Link to="/Fondi">Fondi</Link></li>
        </>}
      </ul>
      <div className="navbar-user">
        <span>{user.username} ({user.role})</span>
        <button type="button" onClick={onLogout}>Esci</button>
      </div>
    </nav>
  );
};

export default Navbar;