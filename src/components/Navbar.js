import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWebsiteData } from '../utils/newsStorage';
import '../styles/Navbar.css';


const Navbar = () => {
  const [websiteData, setWebsiteData] = useState({});
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const data = getWebsiteData();
    setWebsiteData(data);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <nav className="navbar">
      <div className="navbar-brand">
        {websiteData.logo ? (
          <Link to="/">
            <img src={websiteData.logo} alt="BlueCity News" className="navbar-logo" />
          </Link>
        ) : (
          <Link to="/">BlueCity News</Link>
        )}
      </div>
      
      <button 
        className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
        <li><Link to="/category/politics" onClick={() => setIsMenuOpen(false)}>Politics</Link></li>
        <li><Link to="/category/business" onClick={() => setIsMenuOpen(false)}>Business</Link></li>
        <li><Link to="/category/sports" onClick={() => setIsMenuOpen(false)}>Sports</Link></li>
        <li><Link to="/category/entertainment" onClick={() => setIsMenuOpen(false)}>Entertainment</Link></li>
        <li><Link to="/category/heritage" onClick={() => setIsMenuOpen(false)}>Heritage</Link></li>
        <li><Link to="/category/weather" onClick={() => setIsMenuOpen(false)}>Weather</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;