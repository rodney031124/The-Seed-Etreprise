import React from 'react';
import '../styles/about.css';

function About() {
  const team = [
    {
      name: 'Isaac Dombo',
      role: 'CEO & Founder',
      expertise: 'VIP Protection, Property Services',
      icon: 'user-tie'
    },
    {
      name: 'Rotshidzwa Rodney Mavhungu',
      role: 'Web Developer & Landscaper',
      expertise: 'Full-Stack Development, Landscaping',
      icon: 'laptop'
    }
  ];

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <h1>About The Seed Etreprise</h1>
          <p>Building Trust, Delivering Excellence</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Our Story</h2>
              <p>
                The Seed Etreprise is a newly established company dedicated to providing professional services in three core areas: VIP Protection, Property Buying and Selling, and Web Development. 
              </p>
              <p>
                We offer reliable and secure protection services to individuals and organizations, ensuring safety and confidentiality at all times. Our property services focus on assisting clients with the buying and selling of property in a professional and efficient manner. We also provide web development services that help businesses establish and maintain a strong online presence.
              </p>
              <p>
                The Seed Etreprise is committed to delivering high-quality services with integrity, professionalism, and reliability. As we grow, we're dedicated to building long-term relationships with our clients based on trust and exceptional service delivery.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat">
                <h3>3</h3>
                <p>Core Services</p>
              </div>
              <div className="stat">
                <h3>2</h3>
                <p>Team Members</p>
              </div>
              <div className="stat">
                <h3>24/7</h3>
                <p>Availability</p>
              </div>
              <div className="stat">
                <h3>100%</h3>
                <p>Commitment</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values">
        <div className="container">
          <h2>Our Core Values</h2>
          <p className="section-subtitle">The Principles That Guide Everything We Do</p>
          <div className="values-grid">
            <div className="value">
              <div className="value-icon">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3>Integrity</h3>
              <p>We operate with complete honesty and transparency in all our dealings. Our word is our bond, and we stand behind every commitment we make to our clients.</p>
            </div>
            <div className="value">
              <div className="value-icon">
                <i className="fas fa-award"></i>
              </div>
              <h3>Professionalism</h3>
              <p>Excellence is not an act but a habit. We maintain the highest standards in every aspect of our service delivery, from initial consultation to final execution.</p>
            </div>
            <div className="value">
              <div className="value-icon">
                <i className="fas fa-check-double"></i>
              </div>
              <h3>Reliability</h3>
              <p>Consistency is key. You can depend on us to deliver results on time, every time, without compromise on quality or attention to detail.</p>
            </div>
            <div className="value">
              <div className="value-icon">
                <i className="fas fa-eye-slash"></i>
              </div>
              <h3>Confidentiality</h3>
              <p>Your privacy is paramount. We employ industry-leading security measures and strict protocols to ensure your information remains completely protected.</p>
            </div>
            <div className="value">
              <div className="value-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>Innovation</h3>
              <p>We stay ahead of industry trends and continually update our methods and technologies to provide the best solutions available in today's market.</p>
            </div>
            <div className="value">
              <div className="value-icon">
                <i className="fas fa-handshake"></i>
              </div>
              <h3>Client-Focused</h3>
              <p>Your success is our success. We tailor our services to meet your unique needs and work collaboratively to achieve your objectives.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="team">
        <div className="container">
          <h2>Our Team</h2>
          <p className="team-intro">Our dedicated team brings expertise, experience, and passion to every project.</p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-avatar">
                  <i className={`fas fa-${member.icon}`}></i>
                </div>
                <h3>{member.name}</h3>
                <p className="member-role">{member.role}</p>
                <p className="member-expertise">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="philosophy">
        <div className="container">
          <h2>Our Philosophy</h2>
          <p>
            As a newly established company, The Seed Etreprise is built on the foundation of providing exceptional service from day one. We believe that success comes from understanding our clients' unique needs and delivering solutions tailored to their specific requirements. We are committed to building strong relationships based on trust, transparency, and consistent delivery of quality services. Every client interaction is an opportunity to demonstrate our commitment to excellence and professionalism.
          </p>
        </div>
      </section>

      <section className="cta-section" style={{ background: 'linear-gradient(135deg, var(--accent-color) 0%, #d48a0a 100%)', padding: '4rem 0', textAlign: 'center', color: 'white', marginTop: '4rem' }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>Ready to Work With Us?</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            Contact our team today to discuss your needs and how we can help you achieve your goals.
          </p>
          <a href="/contact" className="btn btn-primary" style={{ backgroundColor: 'var(--primary-color)' }}>
            <i className="fas fa-envelope"></i> Contact Us Now
          </a>
        </div>
      </section>
    </div>
  );
}

export default About;