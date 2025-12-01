import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function InstituteDashboard() {
  const { user } = useAuth();
  const [activeCard, setActiveCard] = useState(null);
  const [stats, setStats] = useState([
    { label: "Total Courses", value: 0, target: 12, icon: "📚", color: "#4facfe" },
    { label: "Applications", value: 0, target: 45, icon: "📝", color: "#f59e0b" },
    { label: "Pending Review", value: 0, target: 23, icon: "⏳", color: "#ff6b6b" },
    { label: "Active Students", value: 0, target: 156, icon: "👥", color: "#4ade80" }
  ]);

  const dashboardModules = [
    { 
      to: "/institute/profile", 
      label: "Institution Profile", 
      description: "Manage your institution details and settings",
      icon: "👤", 
      color: "#4facfe",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    { 
      to: "/institute/faculties", 
      label: "Faculty Management", 
      description: "Organize and manage academic departments",
      icon: "🏛️", 
      color: "#ff6b6b",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 100%)"
    },
    { 
      to: "/institute/courses", 
      label: "Course Catalog", 
      description: "Create and manage course offerings",
      icon: "📚", 
      color: "#4ade80",
      gradient: "linear-gradient(135deg, #4ade80 0%, #86efac 100%)"
    },
    { 
      to: "/institute/applications", 
      label: "Applications Hub", 
      description: "Review and process student applications",
      icon: "📝", 
      color: "#a78bfa",
      gradient: "linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)"
    },
    { 
      to: "/institute/admissions", 
      label: "Admissions Center", 
      description: "Publish and manage admission cycles",
      icon: "🎓", 
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fcd34d 100%)"
    },
    { 
      to: "/institute/student-status", 
      label: "Student Management", 
      description: "Monitor and update student status",
      icon: "👥", 
      color: "#06b6d4",
      gradient: "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)"
    }
  ];

  useEffect(() => {
    // Animate stats counting up
    const timers = stats.map((stat, index) => {
      return setTimeout(() => {
        setStats(prev => prev.map((s, i) => 
          i === index ? { ...s, value: Math.min(s.value + Math.ceil(s.target / 10), s.target) } : s
        ));
      }, index * 200);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

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
    shape3: { width: "200px", height: "200px", top: "40%", left: "10%", animationDelay: "6s" },
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
    mainLayout: {
      display: "flex",
      minHeight: "100vh",
      position: "relative",
      zIndex: 1
    },
    contentArea: {
      flex: 1,
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    },
    welcomeSection: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "3rem",
      borderRadius: "24px",
      boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
      color: "white",
      position: "relative",
      overflow: "hidden"
    },
    welcomeOrb: {
      position: "absolute",
      borderRadius: "50%",
      background: "rgba(255,255,255,0.1)"
    },
    welcomeOrb1: {
      width: "200px",
      height: "200px",
      top: "-50px",
      right: "-50px"
    },
    welcomeOrb2: {
      width: "150px",
      height: "150px",
      bottom: "-30px",
      left: "-30px"
    },
    welcomeTitle: {
      fontSize: "2.5rem",
      fontWeight: 800,
      marginBottom: "1rem",
      position: "relative",
      zIndex: 2
    },
    welcomeSubtitle: {
      fontSize: "1.2rem",
      opacity: 0.9,
      fontWeight: 500,
      position: "relative",
      zIndex: 2,
      lineHeight: 1.6,
      maxWidth: "600px"
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1.5rem",
      marginBottom: "1rem"
    },
    statCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      padding: "2rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    statIcon: {
      fontSize: "2.5rem",
      marginBottom: "1rem"
    },
    statValue: {
      fontSize: "2.2rem",
      fontWeight: 800,
      marginBottom: "0.5rem"
    },
    statLabel: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.5px"
    },
    statProgress: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: "4px",
      background: "rgba(255, 255, 255, 0.1)",
      overflow: "hidden"
    },
    progressFill: {
      height: "100%",
      transition: "width 0.5s ease",
      borderRadius: "2px"
    },
    modulesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "1.5rem"
    },
    moduleCard: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      padding: "2rem",
      borderRadius: "20px",
      textDecoration: "none",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    moduleIconWrapper: {
      width: "70px",
      height: "70px",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.8rem",
      boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
      position: "relative",
      zIndex: 2
    },
    moduleContent: {
      flex: 1,
      position: "relative",
      zIndex: 2
    },
    moduleTitle: {
      fontSize: "1.3rem",
      fontWeight: 700,
      color: "white",
      marginBottom: "0.5rem"
    },
    moduleDescription: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500,
      lineHeight: 1.5
    },
    moduleArrow: {
      fontSize: "1.3rem",
      fontWeight: 700,
      opacity: 0.7,
      transition: "all 0.3s ease",
      position: "relative",
      zIndex: 2
    },
    hoverOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0,
      transition: "opacity 0.3s ease"
    },
    footer: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      padding: "1.5rem 2rem",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginTop: "auto",
      textAlign: "center"
    },
    footerText: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500,
      margin: 0
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        {/* Animated Background */}
        <div style={styles.background}>
          <div style={{...styles.floatingShape, ...styles.shape1}}></div>
          <div style={{...styles.floatingShape, ...styles.shape2}}></div>
          <div style={{...styles.floatingShape, ...styles.shape3}}></div>
          <div style={styles.gridPattern}></div>
        </div>

        <div style={styles.mainLayout}>
          <Sidebar links={dashboardModules.map(m => ({ to: m.to, label: m.label, icon: m.icon }))} />
          <div style={styles.contentArea}>
            {/* Welcome Section */}
            <div style={styles.welcomeSection}>
              <div style={{...styles.welcomeOrb, ...styles.welcomeOrb1}}></div>
              <div style={{...styles.welcomeOrb, ...styles.welcomeOrb2}}></div>
              
              <h1 style={styles.welcomeTitle}>
                Welcome to Your Institution Hub, {user?.name}! 🎓
              </h1>
              <p style={styles.welcomeSubtitle}>
                Manage your academic institution with powerful tools for course management, 
                student applications, admissions, and faculty organization. Everything you 
                need to run your institution efficiently.
              </p>
            </div>

            {/* Statistics Overview */}
            <div style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.statCard,
                    transform: activeCard === `stat-${index}` ? "translateY(-8px)" : "translateY(0)",
                    boxShadow: activeCard === `stat-${index}` ? "0 20px 40px rgba(0,0,0,0.2)" : "none"
                  }}
                  onMouseEnter={() => setActiveCard(`stat-${index}`)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div style={styles.statIcon}>{stat.icon}</div>
                  <div style={{...styles.statValue, color: stat.color}}>
                    {stat.value}
                  </div>
                  <div style={styles.statLabel}>{stat.label}</div>
                  <div style={styles.statProgress}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${(stat.value / stat.target) * 100}%`,
                        background: stat.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Management Modules Grid */}
            <div style={styles.modulesGrid}>
              {dashboardModules.map((module, index) => (
                <Link
                  key={module.to}
                  to={module.to}
                  style={{
                    ...styles.moduleCard,
                    transform: activeCard === index ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
                    boxShadow: activeCard === index ? "0 25px 50px rgba(0,0,0,0.2)" : "none",
                    borderColor: activeCard === index ? module.color : "rgba(255, 255, 255, 0.1)"
                  }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div style={{...styles.moduleIconWrapper, background: module.gradient}}>
                    {module.icon}
                  </div>
                  
                  <div style={styles.moduleContent}>
                    <h3 style={styles.moduleTitle}>{module.label}</h3>
                    <p style={styles.moduleDescription}>{module.description}</p>
                  </div>
                  
                  <div style={{
                    ...styles.moduleArrow,
                    color: module.color,
                    transform: activeCard === index ? "translateX(8px)" : "translateX(0)",
                    opacity: activeCard === index ? 1 : 0.7
                  }}>
                    →
                  </div>

                  {/* Hover Overlay */}
                  <div style={{
                    ...styles.hoverOverlay,
                    background: `linear-gradient(135deg, ${module.color}08, ${module.color}15)`,
                    opacity: activeCard === index ? 1 : 0
                  }}></div>

                  {/* Animated Border */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: module.gradient,
                    transform: activeCard === index ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform 0.4s ease"
                  }}></div>
                </Link>
              ))}
            </div>

            {/* Management Footer */}
            <div style={styles.footer}>
              <p style={styles.footerText}>
                🎓 Institution Management Portal • Last updated: {new Date().toLocaleDateString()} • 
                Need administrative assistance? Contact system support
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-20px) rotate(120deg); 
          }
          66% { 
            transform: translateY(10px) rotate(240deg); 
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.1; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.2; 
            transform: scale(1.05); 
          }
        }
      `}</style>
    </>
  );
}