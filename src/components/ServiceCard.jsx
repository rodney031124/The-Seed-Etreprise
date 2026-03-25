import React from 'react';
import '../styles/services.css';

function ServiceCard({ icon, title, description, features }) {
  return (
    <div className="service-card">
      <div className="service-icon-wrapper">
        <div className="service-icon">
          <i className={`fas fa-${icon}`}></i>
        </div>
      </div>
      <h3>{title}</h3>
      <p className="service-description">{description}</p>
      {features && features.length > 0 && (
        <ul className="service-features">
          {features.map((feature, index) => (
            <li key={index}>
              <i className="fas fa-check"></i> 
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ServiceCard;