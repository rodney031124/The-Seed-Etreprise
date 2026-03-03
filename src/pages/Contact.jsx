import React, { useState } from 'react';
import { saveContactSubmission } from '../firebase/firestore';
import '../styles/contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    service: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus(null);

    // Validation
    if (!formData.fullName || !formData.email || !formData.message) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields.'
      });
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      setLoading(false);
      return;
    }

    const result = await saveContactSubmission(formData);

    if (result.success) {
      setSubmitStatus({
        type: 'success',
        message: 'Thank you for your message! We will get back to you soon.'
      });
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        service: '',
        message: ''
      });
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubmitStatus({
        type: 'error',
        message: `Error submitting form: ${result.error}`
      });
    }

    setLoading(false);
  };

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1>Contact Us</h1>
          <p>We're Here to Help - Get In Touch Today</p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>Have questions? We'd love to hear from you. Send us a message and we'll get back to you as soon as possible.</p>
              
              <div className="info-block">
                <h3><i className="fas fa-phone"></i> Phone</h3>
                <p><a href="tel:+27789719713">+27 78 971 9713</a></p>
                <p><a href="tel:+27678938460">+27 67 893 8460</a></p>
                <p className="info-label">Available 24/7 for emergencies</p>
              </div>

              <div className="info-block">
                <h3><i className="fas fa-envelope"></i> Email</h3>
                <p><a href="mailto:ikemdamane@gmail.com">ikemdamane@gmail.com</a></p>
              </div>

              <div className="info-block">
                <h3><i className="fas fa-map-marker-alt"></i> Address</h3>
                <p>South Africa</p>
                <p className="info-label">Currently Mobile - We come to you</p>
              </div>

              <div className="info-block">
                <h3><i className="fas fa-clock"></i> Business Hours</h3>
                <ul className="hours-list">
                  <li><strong>Monday - Friday:</strong> 8:00 AM - 5:00 PM (SAST)</li>
                  <li><strong>Saturday:</strong> 8:00 AM - 4:00 PM (SAST)</li>
                  <li><strong>Sunday:</strong> 8:00 AM - 4:00 PM (SAST)</li>
                  <li className="emergency-notice"><i className="fas fa-exclamation-triangle"></i> Emergency: Available 24/7</li>
                </ul>
              </div>

              <div className="social-block">
                <h3>Follow Us</h3>
                <div className="contact-social">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="social-icon">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" className="social-icon">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="social-icon">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="social-icon">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              <h2>Send us a Message</h2>
              <form className="contact-form" onSubmit={handleSubmit}>
                {submitStatus && (
                  <div className={`status-message ${submitStatus.type}`}>
                    <i className={`fas fa-${submitStatus.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
                    <span>{submitStatus.message}</span>
                  </div>
                )}

                <div className="form-group">
                  <label htmlFor="fullName">Full Name <span className="required">*</span></label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your Full Name"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address <span className="required">*</span></label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27 XXX XXX XXX"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      disabled={loading}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">Service Interested In</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="">Select a service</option>
                      <option value="vip-protection">VIP Protection</option>
                      <option value="property">Property Services</option>
                      <option value="web-development">Web Development</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message <span className="required">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your needs..."
                    rows="6"
                    required
                    disabled={loading}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary submit-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <i className="fas fa-spinner"></i> Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <div className="container">
          <h2>We Serve South Africa</h2>
          <p>Our mobile team is based in South Africa and travels to serve our clients</p>
          <div className="map-wrapper">
            <iframe
              title="South Africa Map"
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7455661.745786783!2d22.5597!3d-30.5595!3m2!1i1024!2i768!4f13.1!3e6!4m5!3s0x1f6b1d3f6b1d3f6d%3A0x1f6b1d3f6b1d3f6d!1m2!1d25.2744!2d-25.7461!3m2!1i1024!2i768"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '8px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;