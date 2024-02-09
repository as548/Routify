// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from "../../../Images/logo.png";
const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header>
      <div className="logo">
        <img className='logo-img' src={logo} alt="" />
      </div>
      <button className="nav-toggle" onClick={toggleNav}>
        &#9776;
      </button>
      <nav className={`nav ${isNavOpen ? 'nav-open' : ''}`}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/account">Profile</Link>
          </li>
          <li>
            <Link to="/urls/me">My URLs</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
