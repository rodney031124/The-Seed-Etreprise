import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Welcome to The Seed Etreprise</h1>
        <p className="hero-subtitle">Professional VIP Protection, Property Services & Web Development</p>
        <div className="hero-buttons">
          <Link to="/services" className="btn btn-primary">
            Explore Our Services
          </Link>
          <Link to="/contact" className="btn btn-secondary">
            Get In Touch
          </Link>
        </div>
      </div>
      <div className="hero-background">
        <div className="hero-shape"></div>
      </div>
    </section>
  );
}

export default Hero;