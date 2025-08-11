import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">BlueCity News</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/category/politics">Politics</Link></li>
        <li><Link to="/category/business">Business</Link></li>
        <li><Link to="/category/sports">Sports</Link></li>
        <li><Link to="/category/entertainment">Entertainment</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;