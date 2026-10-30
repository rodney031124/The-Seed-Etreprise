import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import '../styles/home.css';

function Home() {
  const services = [
    {
      category: 'Digital Solutions',
      services: [
        {
          title: 'Web Development',
          description: 'Custom, mobile-friendly websites designed to establish your brand, attract more customers, and elevate your online presence.',
          features: ['Custom & Responsive Design', 'Risk-Free Demo', 'Modern Tech (React/Firebase)', 'Ongoing Support']
        },
        {
          title: 'Mobile App Development',
          description: 'Custom Android and cross-platform mobile applications tailored to your business needs.',
          features: ['Cross-Platform (Flutter)', 'Android Native (Java)', 'Offline-First Capabilities', 'Deployment']
        },
        {
          title: 'Graphic Design',
          description: 'Eye-catching posters, flyers, and digital graphics that make your brand stand out.',
          features: ['Poster & Flyer Design', 'Social Media Graphics', 'Brand Consistency', 'Print-Ready Files']
        }
      ]
    },
    {
      category: 'Security & Real Estate',
      services: [
        {
          title: 'VIP Protection',
          description: 'Comprehensive security and protection services for high-profile individuals and executives.',
          features: ['24/7 Security', 'Risk Assessment', 'Executive Protection', 'Secure Transportation']
        },
        {
          title: 'Property Services',
          description: 'Complete property buying and selling solutions with expert market analysis.',
          features: ['Market Analysis', 'Negotiation', 'Legal Support', 'Portfolio Management']
        }
      ]
    }
  ];

  return (
    <div className="home">
      <Hero />

      <section className="mission-section">
        <div className="container">
          <h2>Our Mission</h2>
          <p>At The Seed Enterprise, we are committed to delivering exceptional services with the highest standards of professionalism, integrity, and confidentiality. Our team of experts is dedicated to ensuring your complete satisfaction and security.</p>
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