import React from 'react';
//import ServiceCard from '../components/ServiceCard';
import '../styles/services.css';

function Services() {
  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive Solutions for Your Needs</p>
        </div>
      </section>

      <section className="services-detail">
        <div className="container">
          {/* VIP Protection */}
          <div id="vip-protection" className="service-detail-section">
            <div className="service-header">
              <i className="fas fa-shield-alt"></i>
              <h2>VIP Protection Services</h2>
            </div>
            <p className="service-intro">Comprehensive security and protection services tailored for high-profile individuals, executives, and dignitaries.</p>
            
            <div className="service-details">
              <div className="detail-column">
                <h3>Our Offerings</h3>
                <ul className="service-list">
                  <li><i className="fas fa-check-circle"></i> <strong>Executive Protection</strong> - Trained professionals for personal security</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Secure Transportation</strong> - Armored vehicle services and logistics</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Risk Assessment</strong> - Comprehensive threat analysis and planning</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Event Security</strong> - On-site security for private and corporate events</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Residential Protection</strong> - Home security systems and monitoring</li>
                  <li><i className="fas fa-check-circle"></i> <strong>24/7 Monitoring</strong> - Round-the-clock surveillance and response</li>
                </ul>
              </div>
              <div className="detail-column">
                <h3>Why Choose Our VIP Protection?</h3>
                <ul className="benefits-list">
                  <li><i className="fas fa-check"></i> Experienced security professionals with military/law enforcement backgrounds</li>
                  <li><i className="fas fa-check"></i> Advanced threat assessment technologies</li>
                  <li><i className="fas fa-check"></i> Discrete and professional service delivery</li>
                  <li><i className="fas fa-check"></i> Customized security solutions for each client</li>
                  <li><i className="fas fa-check"></i> Rapid response capabilities 24/7</li>
                  <li><i className="fas fa-check"></i> Certified and licensed professionals</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Property Services */}
          <div id="property" className="service-detail-section">
            <div className="service-header">
              <i className="fas fa-home"></i>
              <h2>Property Buying & Selling Services</h2>
            </div>
            <p className="service-intro">Expert real estate solutions for buying, selling, and managing premium properties.</p>
            
            <div className="service-details">
              <div className="detail-column">
                <h3>Our Services</h3>
                <ul className="service-list">
                  <li><i className="fas fa-check-circle"></i> <strong>Market Analysis</strong> - In-depth market research and property valuation</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Property Listing & Marketing</strong> - Premium listing services with targeted marketing</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Buyer Representation</strong> - Expert guidance throughout the buying process</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Negotiation Services</strong> - Skilled negotiators to secure best terms</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Legal Support Coordination</strong> - Connection with trusted legal professionals</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Investment Portfolio Management</strong> - Strategic property investment consulting</li>
                </ul>
              </div>
              <div className="detail-column">
                <h3>What Sets Us Apart</h3>
                <ul className="benefits-list">
                  <li><i className="fas fa-check"></i> Deep knowledge of luxury real estate market</li>
                  <li><i className="fas fa-check"></i> Exclusive access to premium properties</li>
                  <li><i className="fas fa-check"></i> Discreet and confidential transactions</li>
                  <li><i className="fas fa-check"></i> Experience with complex, high-value deals</li>
                  <li><i className="fas fa-check"></i> Strong network of real estate professionals</li>
                  <li><i className="fas fa-check"></i> Comprehensive due diligence procedures</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Web Development */}
          <div id="web-dev" className="service-detail-section">
            <div className="service-header">
              <i className="fas fa-code"></i>
              <h2>Web Development Services</h2>
            </div>
            <p className="service-intro">Custom web solutions designed to enhance your digital presence and drive business growth.</p>
            
            <div className="service-details">
              <div className="detail-column">
                <h3>Our Capabilities</h3>
                <ul className="service-list">
                  <li><i className="fas fa-check-circle"></i> <strong>Custom Web Development</strong> - Tailored solutions using latest technologies</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Responsive Design</strong> - Mobile-first, device-responsive websites</li>
                  <li><i className="fas fa-check-circle"></i> <strong>E-Commerce Solutions</strong> - Secure online store platforms</li>
                  <li><i className="fas fa-check-circle"></i> <strong>SEO Optimization</strong> - Search engine optimization for visibility</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Web Maintenance & Support</strong> - Ongoing technical support and updates</li>
                  <li><i className="fas fa-check-circle"></i> <strong>Cloud Integration</strong> - Scalable cloud-based solutions</li>
                </ul>
              </div>
              <div className="detail-column">
                <h3>Our Development Approach</h3>
                <ul className="benefits-list">
                  <li><i className="fas fa-check"></i> Strategic consultation and planning</li>
                  <li><i className="fas fa-check"></i> Modern, clean code standards</li>
                  <li><i className="fas fa-check"></i> Performance optimization and testing</li>
                  <li><i className="fas fa-check"></i> Security best practices implementation</li>
                  <li><i className="fas fa-check"></i> Ongoing maintenance and support</li>
                  <li><i className="fas fa-check"></i> Analytics integration and monitoring</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;