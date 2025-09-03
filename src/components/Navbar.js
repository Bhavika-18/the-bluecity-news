import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWebsiteData } from '../utils/newsStorage';
import '../styles/Navbar.css';

const Navbar = () => {
  const [websiteData, setWebsiteData] = useState({});

  useEffect(() => {
    const data = getWebsiteData();
    setWebsiteData(data);
  }, []);

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
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/category/politics">Politics</Link></li>
        <li><Link to="/category/business">Business</Link></li>
        <li><Link to="/category/sports">Sports</Link></li>
        <li><Link to="/category/entertainment">Entertainment</Link></li>
        <li><Link to="/category/heritage">Heritage</Link></li>
        <li><Link to="/category/weather">Weather</Link></li>
      
      </ul>
    </nav>
  );
};

export default Navbar;