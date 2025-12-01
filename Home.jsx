import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "🏛️",
      title: "Find Your Institution",
      description: "Discover universities, colleges, and vocational schools across Lesotho"
    },
    {
      icon: "📚",
      title: "Explore Programs",
      description: "Browse hundreds of courses and find the perfect fit for your aspirations"
    },
    {
      icon: "🚀",
      title: "Launch Your Career",
      description: "Connect with employers and kickstart your professional journey"
    }
  ];

  return (
    <div className={`home-container ${isVisible ? 'fade-in' : ''}`}>
      {/* Modern Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <div className="brand-icon">🎯</div>
            <h1 className="brand-name">CareerPathLS</h1>
          </div>
          <nav className="header-nav">
            <Link to="/about" className="nav-item">About Us</Link>
            <Link to="/contact" className="nav-item">Contact</Link>
            <Link to="/login" className="nav-item secondary">Sign In</Link>
            <Link to="/register" className="nav-item primary">Get Started</Link>
          </nav>
        </div>
      </header>

      {/* Interactive Hero */}
      <main className="main-content">
        <section className="modern-hero">
          <div className="hero-background">
            <div className="animated-grid">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="grid-cell" style={{ animationDelay: `${i * 0.1}s` }}></div>
              ))}
            </div>
          </div>
          
          <div className="hero-content-wrapper">
            <div className="hero-text-content">
              <div className="hero-badge">
                <span className="badge-text">Empowering Lesotho's Future</span>
              </div>
              
              <h1 className="hero-title">
                <span className="title-line">Shape Your</span>
                <span className="title-accent">Career Path</span>
                <span className="title-line">in Lesotho</span>
              </h1>
              
              <p className="hero-description">
                Your comprehensive platform for educational discovery and career advancement. 
                Find institutions, explore programs, and build the future you deserve.
              </p>

              <div className="hero-actions">
                <Link to="/discover" className="action-btn primary">
                  <span className="btn-content">
                    <span className="btn-icon">🔍</span>
                    Explore Opportunities
                  </span>
                </Link>
                <Link to="/register" className="action-btn secondary">
                  <span className="btn-content">
                    <span className="btn-icon">⭐</span>
                    Join Now
                  </span>
                </Link>
              </div>

              <div className="achievement-stats">
                <div className="stat-item">
                  <div className="stat-value">50+</div>
                  <div className="stat-label">Partner Institutions</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">200+</div>
                  <div className="stat-label">Academic Programs</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">1K+</div>
                  <div className="stat-label">Successful Students</div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="floating-cards">
                <div className="card card-1">
                  <div className="card-icon">🎓</div>
                  <div className="card-text">Education</div>
                </div>
                <div className="card card-2">
                  <div className="card-icon">💼</div>
                  <div className="card-text">Career</div>
                </div>
                <div className="card card-3">
                  <div className="card-icon">🌟</div>
                  <div className="card-text">Growth</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Features */}
        <section className="features-showcase">
          <div className="section-header">
            <h2 className="section-title">Your Journey Starts Here</h2>
            <p className="section-subtitle">Three simple steps to transform your future</p>
          </div>

          <div className="features-container">
            <div className="feature-navigation">
              {features.map((feature, index) => (
                <button
                  key={index}
                  className={`feature-nav-btn ${currentFeature === index ? 'active' : ''}`}
                  onClick={() => setCurrentFeature(index)}
                >
                  {feature.title}
                </button>
              ))}
            </div>

            <div className="feature-display">
              <div className="feature-content">
                <div className="feature-icon-bg">
                  <span className="feature-icon">{features[currentFeature].icon}</span>
                </div>
                <h3 className="feature-title">{features[currentFeature].title}</h3>
                <p className="feature-description">{features[currentFeature].description}</p>
                <Link to="/discover" className="feature-link">
                  Learn More →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive CTA */}
        <section className="action-section">
          <div className="action-background">
            <div className="pulse-ring"></div>
            <div className="pulse-ring delay-1"></div>
            <div className="pulse-ring delay-2"></div>
          </div>
          
          <div className="action-content">
            <h2 className="action-title">Begin Your Transformation Today</h2>
            <p className="action-text">
              Join a community of ambitious students and professionals shaping Lesotho's future
            </p>
            <div className="action-buttons">
              <Link to="/register" className="cta-btn primary">
                Start Your Journey
              </Link>
              <Link to="/discover" className="cta-btn outline">
                Browse Programs
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Minimal Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-icon">🎯</div>
            <span className="brand-name">CareerPathLS</span>
          </div>
          <div className="footer-links">
            <Link to="/about" className="footer-link">About</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/privacy" className="footer-link">Privacy</Link>
            <Link to="/terms" className="footer-link">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;