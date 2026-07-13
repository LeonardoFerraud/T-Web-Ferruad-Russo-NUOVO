import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">GestioneFinanze</Link>
      </div>
      
      <ul className="navbar-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/Entrate">Entrate</Link></li>
        <li><Link to="/Spese">Spese</Link></li>
        <li><Link to="/Fondi">Fondi</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;