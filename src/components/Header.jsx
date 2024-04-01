
import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Header.css';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/timesheet">Timesheet Manager</Link></li>
          <li><Link to="home">Home</Link></li>
          {/* Add more navigation links specific to Timesheet Manager if needed */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
