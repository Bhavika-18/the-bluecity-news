import React from 'react';
import '../styles/Footer.css';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>BlueCity News</h3>
          <p>Bringing you the latest updates from Jodhpur since 2023.</p>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: info@bluecitynews.com</p>
          <p>Phone: +91 8094292000</p>
        </div>
        
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://www.facebook.com/thebluecityjodhpurofficial/"><Facebook size={24} /></a>
            <a href="https://www.instagram.com/thebluecityjodhpurofficial/?hl=en"><Instagram size={24} /></a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} BlueCity News. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;