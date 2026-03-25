import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3><i className="fas fa-leaf"></i> The Seed Etreprise</h3>
          <p>Providing professional VIP Protection, Property Services, and cutting-edge Web Development solutions across South Africa.</p>
          <div className="social-links">
            <a href="https://facebook.com/seedetreprise" target="_blank" rel="noopener noreferrer" title="Facebook" className="social-link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com/seedetreprise" target="_blank" rel="noopener noreferrer" title="Twitter" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com/company/seedetreprise" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://instagram.com/seedetreprise" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="/#vip-protection">VIP Protection</a></li>
            <li><a href="/#property">Property Services</a></li>
            <li><a href="/#web-dev">Web Development</a></li>
            <li><a href="/contact">Request Quote</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p><i className="fas fa-phone"></i> <a href="tel:+27789719713">+27 789 719 713</a></p>
          <p><i className="fas fa-envelope"></i> <a href="mailto:ikemdamane@gmail.com">ikemdamane@gmail.com</a></p>
          <p><i className="fas fa-map-marker-alt"></i> South Africa (Mobile Service)</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} The Seed Etreprise. All rights reserved. | <a href="#privacy">Privacy Policy</a> | <a href="#terms">Terms of Service</a></p>
      </div>
    </footer>
  );
}

export default Footer;