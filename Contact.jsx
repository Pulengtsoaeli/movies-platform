import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    alert('🎉 Thank you for your message! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="contact-container">
      {/* Enhanced Navigation Bar */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">CareerLaunch</span>
          </div>
          <div className="nav-links">
            <Link to="/" className="nav-link">
              <span className="nav-icon">🏠</span>
              Home
            </Link>
            <Link to="/about" className="nav-link">
              <span className="nav-icon">👥</span>
              About
            </Link>
            <Link to="/contact" className="nav-link active">
              <span className="nav-icon">📞</span>
              Contact
            </Link>
          </div>
          <Link to="/register" className="btn btn-primary">
            <span className="btn-icon">🎯</span>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Enhanced Contact Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <div className="hero-orb orb-1"></div>
            <div className="hero-orb orb-2"></div>
            <div className="hero-orb orb-3"></div>
            
            <h1 className="contact-title">
              Let's Start a 
              <span className="gradient-text"> Conversation</span>
            </h1>
            <p className="contact-subtitle">
              Your gateway to educational excellence in Lesotho. Reach out to us for partnerships, 
              support, or to learn how we're transforming student-institution connections.
            </p>
            
            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-value">24/7</div>
                <div className="stat-label">Support</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">2h</div>
                <div className="stat-label">Avg Response</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">98%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Content */}
      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Enhanced Contact Form */}
            <div className="contact-form-section">
              <div className="section-header">
                <h2>Send Your Message</h2>
                <p className="section-subtitle">We're here to help and answer any questions you might have</p>
              </div>
              
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      <span className="label-icon">👤</span>
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <span className="label-icon">📧</span>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email address"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    <span className="label-icon">🎯</span>
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select a subject</option>
                    <option value="student-support">Student Support</option>
                    <option value="institution-partnership">Institution Partnership</option>
                    <option value="technical-issue">Technical Issue</option>
                    <option value="general-inquiry">General Inquiry</option>
                    <option value="career-guidance">Career Guidance</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <span className="label-icon">💬</span>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us more about your inquiry, questions, or how we can help you..."
                    className="form-textarea"
                  ></textarea>
                  <div className="char-count">
                    {formData.message.length}/500 characters
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary btn-full ${isSubmitting ? 'btn-loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">🚀</span>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Enhanced Contact Information */}
            <div className="contact-info-section">
              <div className="section-header">
                <h2>Connect With Us</h2>
                <p className="section-subtitle">Multiple ways to reach our dedicated support team</p>
              </div>
              
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <div className="contact-icon">📍</div>
                    <div className="icon-pulse"></div>
                  </div>
                  <div className="contact-details">
                    <h3>Visit Our Campus</h3>
                    <p>Maseru 100, Lesotho</p>
                    <p>Kingsway Street, Central District</p>
                    <div className="contact-meta">
                      <span className="meta-item">🕒 Mon - Fri: 8:00 AM - 6:00 PM</span>
                      <span className="meta-item">🕒 Sat: 9:00 AM - 1:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <div className="contact-icon">📞</div>
                    <div className="icon-pulse"></div>
                  </div>
                  <div className="contact-details">
                    <h3>Call Us Directly</h3>
                    <p className="phone-number">+266 1234 5678</p>
                    <p className="phone-number">+266 9876 5432</p>
                    <div className="contact-meta">
                      <span className="meta-item">📱 Available on WhatsApp</span>
                      <span className="meta-item">🕒 24/7 Emergency Support</span>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <div className="contact-icon">✉️</div>
                    <div className="icon-pulse"></div>
                  </div>
                  <div className="contact-details">
                    <h3>Email Support</h3>
                    <p className="email-address">support@careerlaunch.co.ls</p>
                    <p className="email-address">partnerships@careerlaunch.co.ls</p>
                    <div className="contact-meta">
                      <span className="meta-item">⏰ Response Time: 2-4 hours</span>
                      <span className="meta-item">🔒 Secure & Encrypted</span>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon-wrapper">
                    <div className="contact-icon">🌐</div>
                    <div className="icon-pulse"></div>
                  </div>
                  <div className="contact-details">
                    <h3>Social Connections</h3>
                    <div className="social-links">
                      <a href="#" className="social-link">
                        <span className="social-icon">📘</span>
                        Facebook
                      </a>
                      <a href="#" className="social-link">
                        <span className="social-icon">🐦</span>
                        Twitter
                      </a>
                      <a href="#" className="social-link">
                        <span className="social-icon">💼</span>
                        LinkedIn
                      </a>
                      <a href="#" className="social-link">
                        <span className="social-icon">📷</span>
                        Instagram
                      </a>
                    </div>
                    <div className="contact-meta">
                      <span className="meta-item">📢 Live updates & announcements</span>
                      <span className="meta-item">💬 Direct messaging available</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced FAQ Section */}
              <div className="faq-section">
                <div className="section-header">
                  <h3>Quick Answers</h3>
                  <p className="section-subtitle">Common questions from our community</p>
                </div>
                
                <div className="faq-grid">
                  <div className="faq-item">
                    <div className="faq-icon">🎓</div>
                    <div className="faq-content">
                      <h4>How do I register as a student?</h4>
                      <p>Click "Get Started" and complete our streamlined registration. You'll need your academic transcripts and personal identification documents ready.</p>
                    </div>
                  </div>
                  
                  <div className="faq-item">
                    <div className="faq-icon">🏫</div>
                    <div className="faq-content">
                      <h4>Can institutions partner with you?</h4>
                      <p>Absolutely! We welcome partnerships with educational institutions across Lesotho. Contact our partnerships team for customized solutions.</p>
                    </div>
                  </div>
                  
                  <div className="faq-item">
                    <div className="faq-icon">💳</div>
                    <div className="faq-content">
                      <h4>Is the platform free for students?</h4>
                      <p>Yes, our platform is completely free for students. We believe in removing financial barriers to education and career opportunities.</p>
                    </div>
                  </div>
                  
                  <div className="faq-item">
                    <div className="faq-icon">🔒</div>
                    <div className="faq-content">
                      <h4>How secure is my data?</h4>
                      <p>We use enterprise-grade encryption and comply with data protection regulations. Your information is safe and never shared without consent.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Quick Actions */}
      <section className="quick-actions">
        <div className="container">
          <div className="section-header">
            <h2>Ready to Get Started?</h2>
            <p className="section-subtitle">Choose your path and begin your educational journey today</p>
          </div>
          
          <div className="action-buttons">
            <Link to="/student-registration" className="action-btn">
              <div className="action-icon">🎓</div>
              <div className="action-content">
                <h3>Student Registration</h3>
                <p>Begin your academic journey</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>
            
            <Link to="/institution-portal" className="action-btn">
              <div className="action-icon">🏫</div>
              <div className="action-content">
                <h3>Institution Portal</h3>
                <p>Manage applications & students</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>
            
            <Link to="/career-guidance" className="action-btn">
              <div className="action-icon">💼</div>
              <div className="action-content">
                <h3>Career Guidance</h3>
                <p>Explore career opportunities</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>
            
            <Link to="/resources" className="action-btn">
              <div className="action-icon">📚</div>
              <div className="action-content">
                <h3>Learning Resources</h3>
                <p>Access study materials</p>
              </div>
              <div className="action-arrow">→</div>
            </Link>
          </div>
          
          <div className="quick-stats">
            <div className="quick-stat">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">Students Helped</div>
            </div>
            <div className="quick-stat">
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner Institutions</div>
            </div>
            <div className="quick-stat">
              <div className="stat-number">98%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;