import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
      color: "white",
      position: "relative",
      overflow: "hidden"
    },
    background: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0
    },
    floatingShape: {
      position: "absolute",
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.05) 100%)",
      animation: "float 8s ease-in-out infinite"
    },
    shape1: { width: "400px", height: "400px", top: "-150px", right: "-100px", animationDelay: "0s" },
    shape2: { width: "300px", height: "300px", bottom: "-120px", left: "-80px", animationDelay: "3s" },
    shape3: { width: "200px", height: "200px", top: "30%", left: "10%", animationDelay: "6s" },
    gridPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      backgroundSize: "50px 50px"
    },
    content: {
      position: "relative",
      zIndex: 1
    },
    navbar: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "1rem 2rem",
      position: "sticky",
      top: 0,
      zIndex: 100
    },
    navContent: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    logo: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontSize: "1.5rem",
      fontWeight: 800,
      color: "white",
      textDecoration: "none"
    },
    logoIcon: {
      width: "40px",
      height: "40px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.25rem",
      boxShadow: "0 4px 15px rgba(79, 172, 254, 0.4)"
    },
    navLinks: {
      display: "flex",
      gap: "2rem",
      alignItems: "center"
    },
    navLink: {
      color: "rgba(255, 255, 255, 0.8)",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: "1rem",
      transition: "all 0.3s ease",
      padding: "0.5rem 1rem",
      borderRadius: "8px"
    },
    aboutHero: {
      padding: "6rem 2rem 4rem",
      textAlign: "center",
      background: "linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.1) 100%)",
      position: "relative",
      overflow: "hidden"
    },
    aboutTitle: {
      fontSize: "4rem",
      fontWeight: 900,
      marginBottom: "1.5rem",
      background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow: "0 4px 20px rgba(0,0,0,0.3)"
    },
    aboutSubtitle: {
      fontSize: "1.5rem",
      opacity: 0.9,
      fontWeight: 500,
      lineHeight: 1.6,
      maxWidth: "600px",
      margin: "0 auto 2rem"
    },
    missionSection: {
      padding: "6rem 2rem",
      background: "rgba(255, 255, 255, 0.05)"
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto"
    },
    missionGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "4rem",
      alignItems: "center"
    },
    missionContent: {
      h2: {
        fontSize: "3rem",
        fontWeight: 800,
        marginBottom: "1.5rem",
        background: "linear-gradient(135deg, #4facfe, #00f2fe)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text"
      },
      p: {
        fontSize: "1.2rem",
        lineHeight: 1.7,
        color: "rgba(255, 255, 255, 0.8)",
        marginBottom: "1.5rem"
      }
    },
    missionVisual: {
      display: "flex",
      justifyContent: "center"
    },
    visualCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "3rem 2rem",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center",
      maxWidth: "300px",
      transition: "all 0.3s ease"
    },
    visualIcon: {
      fontSize: "4rem",
      marginBottom: "1.5rem",
      display: "block"
    },
    valuesSection: {
      padding: "6rem 2rem",
      background: "rgba(255, 255, 255, 0.02)"
    },
    sectionTitle: {
      fontSize: "3rem",
      fontWeight: 800,
      textAlign: "center",
      marginBottom: "4rem",
      background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    },
    valuesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "2rem"
    },
    valueCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "3rem 2rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden"
    },
    valueIcon: {
      fontSize: "3rem",
      marginBottom: "1.5rem",
      display: "block"
    },
    teamSection: {
      padding: "6rem 2rem",
      background: "rgba(255, 255, 255, 0.05)"
    },
    offeringsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "2rem"
    },
    offeringCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "3rem 2rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease",
      position: "relative",
      overflow: "hidden"
    },
    aboutCta: {
      padding: "6rem 2rem",
      background: "linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.1) 100%)",
      textAlign: "center"
    },
    ctaContent: {
      maxWidth: "600px",
      margin: "0 auto"
    },
    ctaActions: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: "2rem"
    },
    btn: {
      padding: "1rem 2rem",
      borderRadius: "12px",
      fontSize: "1.1rem",
      fontWeight: 600,
      textDecoration: "none",
      transition: "all 0.3s ease",
      border: "none",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    btnPrimary: {
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      color: "white",
      boxShadow: "0 4px 20px rgba(79, 172, 254, 0.4)"
    },
    btnOutline: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "white",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)"
    }
  };

  // Add hover effects
  const addHoverEffects = (element) => ({
    ...element,
    onMouseEnter: (e) => {
      e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.3)";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
    }
  });

  const addNavHover = (element) => ({
    ...element,
    onMouseEnter: (e) => {
      e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
      e.currentTarget.style.color = "white";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "rgba(255, 255, 255, 0.8)";
    }
  });

  const addButtonHover = (element, isPrimary = true) => ({
    ...element,
    onMouseEnter: (e) => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = isPrimary 
        ? "0 8px 30px rgba(79, 172, 254, 0.6)"
        : "0 8px 30px rgba(255, 255, 255, 0.2)";
    },
    onMouseLeave: (e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = isPrimary 
        ? "0 4px 20px rgba(79, 172, 254, 0.4)"
        : "none";
    }
  });

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.background}>
        <div style={{...styles.floatingShape, ...styles.shape1}}></div>
        <div style={{...styles.floatingShape, ...styles.shape2}}></div>
        <div style={{...styles.floatingShape, ...styles.shape3}}></div>
        <div style={styles.gridPattern}></div>
      </div>

      <div style={styles.content}>
        {/* Navigation Bar */}
        <nav style={styles.navbar}>
          <div style={styles.navContent}>
            <Link to="/" style={styles.logo}>
              <div style={styles.logoIcon}>🎯</div>
              <span>CareerPathLS</span>
            </Link>
            <div style={styles.navLinks}>
              <Link 
                to="/" 
                style={addNavHover(styles.navLink)}
              >
                Home
              </Link>
              <Link 
                to="/contact" 
                style={addNavHover(styles.navLink)}
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>

        {/* About Hero Section */}
        <section style={styles.aboutHero}>
          <div style={styles.container}>
            <div style={styles.aboutHeroContent}>
              <h1 style={styles.aboutTitle}>
                About <span style={{background: "linear-gradient(135deg, #4facfe, #00f2fe)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"}}>Career Path Lesotho</span>
              </h1>
              <p style={styles.aboutSubtitle}>
                Empowering the future of Lesotho through innovative education and career development solutions
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section style={styles.missionSection}>
          <div style={styles.container}>
            <div style={styles.missionGrid}>
              <div style={styles.missionContent}>
                <h2 style={styles.missionContent.h2}>Our Mission</h2>
                <p style={styles.missionContent.p}>
                  Career Path Lesotho is dedicated to bridging the gap between education and employment 
                  in the Kingdom of Lesotho. We provide a comprehensive platform that connects students 
                  with educational institutions and career opportunities.
                </p>
                <p style={styles.missionContent.p}>
                  Our goal is to simplify the journey from education to employment, making it easier 
                  for Basotho youth to build successful careers and contribute to national development 
                  through innovative technology solutions.
                </p>
              </div>
              <div style={styles.missionVisual}>
                <div {...addHoverEffects(styles.visualCard)}>
                  <span style={styles.visualIcon}>🎯</span>
                  <h3 style={{fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "white"}}>Clear Pathways</h3>
                  <p style={{color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6}}>Guiding students from education to meaningful careers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section style={styles.valuesSection}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>Our Values</h2>
            <div style={styles.valuesGrid}>
              <div {...addHoverEffects(styles.valueCard)}>
                <div style={styles.valueIcon}>🌍</div>
                <h3 style={{fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "white"}}>Accessibility</h3>
                <p style={{color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6}}>Making education and career opportunities accessible to all Basotho citizens</p>
              </div>
              <div {...addHoverEffects(styles.valueCard)}>
                <div style={styles.valueIcon}>🤝</div>
                <h3 style={{fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "white"}}>Collaboration</h3>
                <p style={{color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6}}>Working with institutions and employers to create sustainable opportunities</p>
              </div>
              <div {...addHoverEffects(styles.valueCard)}>
                <div style={styles.valueIcon}>🚀</div>
                <h3 style={{fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "white"}}>Innovation</h3>
                <p style={{color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6}}>Using cutting-edge technology to transform education and career development</p>
              </div>
              <div {...addHoverEffects(styles.valueCard)}>
                <div style={styles.valueIcon}>💡</div>
                <h3 style={{fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "white"}}>Empowerment</h3>
                <p style={{color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6}}>Empowering youth to take control of their future and drive national progress</p>
              </div>
            </div>
          </div>
        </section>

        {/* Offerings Section */}
        <section style={styles.teamSection}>
          <div style={styles.container}>
            <h2 style={styles.sectionTitle}>What We Offer</h2>
            <div style={styles.offeringsGrid}>
              <div {...addHoverEffects(styles.offeringCard)}>
                <h3 style={{fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "white", textAlign: "center"}}>For Students</h3>
                <ul style={{listStyle: "none", padding: 0, color: "rgba(255, 255, 255, 0.9)"}}>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>🎓 Discover educational programs</li>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>⚡ Streamlined application process</li>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>🧭 Career guidance and counseling</li>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>💼 Job placement opportunities</li>
                </ul>
              </div>
              <div {...addHoverEffects(styles.offeringCard)}>
                <h3 style={{fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "white", textAlign: "center"}}>For Institutions</h3>
                <ul style={{listStyle: "none", padding: 0, color: "rgba(255, 255, 255, 0.9)"}}>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>📈 Reach more qualified students</li>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>🤖 Streamlined admissions process</li>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>🌐 Digital presence enhancement</li>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>🏢 Industry partnerships</li>
                </ul>
              </div>
              <div {...addHoverEffects(styles.offeringCard)}>
                <h3 style={{fontSize: "1.5rem", fontWeight: 700, marginBottom: "1.5rem", color: "white", textAlign: "center"}}>For Employers</h3>
                <ul style={{listStyle: "none", padding: 0, color: "rgba(255, 255, 255, 0.9)"}}>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>🎯 Access to qualified graduates</li>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>🔧 Structured internship programs</li>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>🤝 Industry-academia collaboration</li>
                  <li style={{padding: "0.5rem 0", fontSize: "1.1rem"}}>📊 Talent pipeline development</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.aboutCta}>
          <div style={styles.container}>
            <div style={styles.ctaContent}>
              <h2 style={{...styles.sectionTitle, marginBottom: "1rem"}}>Join Our Mission</h2>
              <p style={{fontSize: "1.3rem", opacity: 0.9, marginBottom: "2rem"}}>
                Be part of the movement to transform education and employment in Lesotho
              </p>
              <div style={styles.ctaActions}>
                <Link 
                  to="/register" 
                  {...addButtonHover({...styles.btn, ...styles.btnPrimary})}
                >
                  🚀 Get Started
                </Link>
                <Link 
                  to="/contact" 
                  {...addButtonHover({...styles.btn, ...styles.btnOutline}, false)}
                >
                  📞 Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
    </div>
  );
};

export default About;