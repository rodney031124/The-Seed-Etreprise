import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';
import services from '../data/services';
import '../styles/services.css';

function Services() {
  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Digital, security, and property solutions designed around your needs.</p>
        </div>
      </section>

      <section className="services-detail services-catalog">
        <div className="container">
          {services.map((category) => (
            <section id={category.id} className="service-category" key={category.id}>
              <h2 className="service-category-title">{category.category}</h2>
              <div className="service-category-grid">
                {category.services.map((service) => (
                  <ServiceCard key={service.id} {...service} />
                ))}
              </div>
            </section>
          ))}
          <div className="services-contact-cta">
            <h2>Ready to get started?</h2>
            <p>Tell us what you need and we’ll help you find the right solution.</p>
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;