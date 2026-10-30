import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import services from '../data/services';
import '../styles/home.css';

function Home() {
  return (
    <div className="home">
      <Hero />

      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <p>At The Seed Etreprise, we are committed to delivering exceptional digital, security, and property services with the highest standards of professionalism, integrity, and confidentiality.</p>
        </div>
      </section>

      <section className="services-preview">
        <div className="container">
          <h2>Our Core Services</h2>
          {services.map((category) => (
            <section className="service-category" key={category.category}>
              <h3 className="service-category-title">{category.category}</h3>
              <div className="service-category-grid">
                {category.services.map((service) => (
                  <ServiceCard key={service.title} {...service} />
                ))}
              </div>
            </section>
          ))}
          <div className="services-cta">
            <Link to="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <h2>Why Choose Us</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3><i className="fas fa-handshake"></i> Professionalism</h3>
              <p>We maintain the highest standards in all our operations and interactions with clients.</p>
            </div>
            <div className="value-card">
              <h3><i className="fas fa-heart"></i> Integrity</h3>
              <p>Honesty and transparency are the foundation of our relationships with our clients.</p>
            </div>
            <div className="value-card">
              <h3><i className="fas fa-lock"></i> Confidentiality</h3>
              <p>Your privacy and sensitive information are protected with the utmost care.</p>
            </div>
            <div className="value-card">
              <h3><i className="fas fa-star"></i> Reliability</h3>
              <p>We deliver consistent, dependable service you can trust, every single time.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Work With Us?</h2>
          <p>Contact our team today to discuss your needs and how we can help you achieve your goals.</p>
          <Link to="/contact" className="btn btn-primary">
            Contact Us Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;