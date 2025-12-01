import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [activeCard, setActiveCard] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const sections = [
    { 
      title: "Manage Institutions", 
      path: "/admin/institutions", 
      icon: "🏫", 
      color: "#4facfe",
      description: "Manage educational institutions and their profiles",
      stats: "15 Active"
    },
    { 
      title: "Manage Faculties", 
      path: "/admin/faculties", 
      icon: "🏛️", 
      color: "#ff6b6b",
      description: "Oversee faculty departments and academic structures",
      stats: "42 Departments"
    },
    { 
      title: "Manage Courses", 
      path: "/admin/courses", 
      icon: "📚", 
      color: "#4ade80",
      description: "Monitor and manage course offerings across institutions",
      stats: "245 Courses"
    },
    { 
      title: "Manage Companies", 
      path: "/admin/companies", 
      icon: "💼", 
      color: "#a78bfa",
      description: "Manage registered companies and their job postings",
      stats: "68 Partners"
    },
    { 
      title: "Reports & Analytics", 
      path: "/admin/reports", 
      icon: "📊", 
      color: "#f59e0b",
      description: "View system analytics and generate reports",
      stats: "Live Data"
    },
    { 
      title: "Publish Admissions", 
      path: "/admin/admissions", 
      icon: "🎓", 
      color: "#06b6d4",
      description: "Oversee admission processes and results",
      stats: "1.2K Applications"
    },
    { 
      title: "Monitor Registered Users", 
      path: "/admin/users", 
      icon: "👥", 
      color: "#ec4899",
      description: "Monitor user activity and manage accounts",
      stats: "3.4K Users"
    },
  ];

  const stats = [
    { label: "Total Institutions", value: "15", icon: "🏫", color: "#4facfe", trend: "+2 this month" },
    { label: "Active Courses", value: "245", icon: "📚", color: "#ff6b6b", trend: "98% active" },
    { label: "Registered Companies", value: "68", icon: "💼", color: "#4ade80", trend: "+12 new" },
    { label: "System Users", value: "3,428", icon: "👤", color: "#a78bfa", trend: "234 online" }
  ];

  const recentActivities = [
    { action: "New institution registered", time: "5 min ago", type: "institution" },
    { action: "Course approval required", time: "12 min ago", type: "course" },
    { action: "Company partnership request", time: "25 min ago", type: "company" },
    { action: "System backup completed", time: "1 hour ago", type: "system" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
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
      zIndex: 1,
      padding: "2rem",
      maxWidth: "1400px",
      margin: "0 auto"
    },
    header: {
      background: "linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.1) 100%)",
      padding: "3rem",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      color: "white",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(10px)",
      marginBottom: "2rem"
    },
    headerIcon: {
      width: "100px",
      height: "100px",
      background: "rgba(255, 255, 255, 0.15)",
      borderRadius: "25px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      marginBottom: "1.5rem",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
    },
    headerTitle: {
      fontSize: "3.5rem",
      fontWeight: 900,
      marginBottom: "1rem",
      background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow: "0 4px 20px rgba(0,0,0,0.3)"
    },
    headerSubtitle: {
      fontSize: "1.3rem",
      opacity: 0.9,
      fontWeight: 500,
      lineHeight: 1.6,
      maxWidth: "600px"
    },
    timeDisplay: {
      position: "absolute",
      top: "2rem",
      right: "2rem",
      background: "rgba(255, 255, 255, 0.1)",
      padding: "0.75rem 1.5rem",
      borderRadius: "15px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      fontSize: "1.1rem",
      fontWeight: 600
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem"
    },
    statCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
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
      marginBottom: "1rem",
      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
    },
    statValue: {
      fontSize: "2.2rem",
      fontWeight: 900,
      marginBottom: "0.5rem",
      textShadow: "0 2px 8px rgba(0,0,0,0.3)"
    },
    statLabel: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.8)",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      marginBottom: "0.5rem"
    },
    statTrend: {
      fontSize: "0.8rem",
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: 600
    },
    mainGrid: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "2rem",
      marginBottom: "2rem"
    },
    sectionsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "1.5rem"
    },
    sectionCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
      textDecoration: "none",
      color: "inherit",
      display: "block"
    },
    sectionHeader: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1.25rem",
      marginBottom: "1rem"
    },
    sectionIcon: {
      width: "70px",
      height: "70px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      border: "2px solid rgba(255, 255, 255, 0.2)",
      transition: "all 0.3s ease",
      flexShrink: 0
    },
    sectionContent: {
      flex: 1
    },
    sectionTitle: {
      fontSize: "1.4rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "0.5rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    sectionDescription: {
      fontSize: "0.95rem",
      color: "rgba(255, 255, 255, 0.7)",
      lineHeight: 1.5,
      marginBottom: "1rem"
    },
    sectionStats: {
      fontSize: "0.85rem",
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: 600,
      marginBottom: "1.5rem"
    },
    sectionAction: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "1rem",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)"
    },
    actionText: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.8)",
      fontWeight: 600
    },
    actionArrow: {
      width: "32px",
      height: "32px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      color: "white",
      fontWeight: 700,
      transition: "all 0.3s ease"
    },
    sidebar: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    },
    activitiesCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    activitiesTitle: {
      fontSize: "1.5rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    },
    activityList: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    },
    activityItem: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      transition: "all 0.3s ease"
    },
    activityIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
      flexShrink: 0
    },
    activityContent: {
      flex: 1
    },
    activityAction: {
      fontSize: "0.95rem",
      fontWeight: 600,
      color: "white",
      marginBottom: "0.25rem"
    },
    activityTime: {
      fontSize: "0.85rem",
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: 500
    },
    systemStatus: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center"
    },
    statusIndicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      marginBottom: "1rem"
    },
    statusDot: {
      width: "12px",
      height: "12px",
      background: "#10b981",
      borderRadius: "50%",
      animation: "pulse 2s infinite"
    },
    statusText: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.9)",
      fontWeight: 600
    },
    versionInfo: {
      fontSize: "0.8rem",
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: 500
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "institution": return { icon: "🏫", color: "#4facfe" };
      case "course": return { icon: "📚", color: "#4ade80" };
      case "company": return { icon: "💼", color: "#a78bfa" };
      case "system": return { icon: "⚙️", color: "#f59e0b" };
      default: return { icon: "📢", color: "#64748b" };
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

        <div style={styles.content}>
          {/* Header Section */}
          <div style={styles.header}>
            <div style={styles.timeDisplay}>
              🕒 {currentTime.toLocaleTimeString()}
            </div>
            <div style={styles.headerIcon}>⚙️</div>
            <h1 style={styles.headerTitle}>Administration Hub</h1>
            <p style={styles.headerSubtitle}>
              Comprehensive system management and monitoring dashboard for CareerLaunch platform.
              Monitor platform health, manage resources, and oversee all system operations.
            </p>
          </div>

          {/* Stats Overview */}
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  ...styles.statCard,
                  background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                  borderColor: `${stat.color}30`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.background = `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.background = `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`;
                }}
              >
                <div style={styles.statIcon}>{stat.icon}</div>
                <div style={{...styles.statValue, color: stat.color}}>
                  {stat.value}
                </div>
                <div style={styles.statLabel}>{stat.label}</div>
                <div style={styles.statTrend}>{stat.trend}</div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div style={styles.mainGrid}>
            {/* Management Sections */}
            <div style={styles.sectionsGrid}>
              {sections.map((section, index) => {
                const isActive = activeCard === index;
                return (
                  <Link
                    key={section.path}
                    to={section.path}
                    style={styles.sectionCard}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div
                      style={{
                        ...styles.sectionCard,
                        background: isActive 
                          ? `linear-gradient(135deg, ${section.color}20, ${section.color}08)`
                          : "rgba(255, 255, 255, 0.08)",
                        borderColor: isActive ? section.color : "rgba(255, 255, 255, 0.1)",
                        transform: isActive ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)",
                        boxShadow: isActive ? `0 20px 40px ${section.color}20` : "none"
                      }}
                    >
                      <div style={styles.sectionHeader}>
                        <div style={{
                          ...styles.sectionIcon,
                          background: `linear-gradient(135deg, ${section.color}30, ${section.color}15)`,
                          borderColor: section.color,
                          transform: isActive ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)"
                        }}>
                          {section.icon}
                        </div>
                        <div style={styles.sectionContent}>
                          <h3 style={styles.sectionTitle}>{section.title}</h3>
                          <p style={styles.sectionDescription}>{section.description}</p>
                          <div style={styles.sectionStats}>{section.stats}</div>
                        </div>
                      </div>
                      <div style={styles.sectionAction}>
                        <span style={styles.actionText}>Manage Section</span>
                        <div style={{
                          ...styles.actionArrow,
                          background: isActive ? section.color : "rgba(255, 255, 255, 0.1)",
                          transform: isActive ? "translateX(5px)" : "translateX(0)"
                        }}>
                          →
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Sidebar */}
            <div style={styles.sidebar}>
              {/* Recent Activities */}
              <div style={styles.activitiesCard}>
                <h3 style={styles.activitiesTitle}>
                  <span style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem"
                  }}>📈</span>
                  Recent Activities
                </h3>
                <div style={styles.activityList}>
                  {recentActivities.map((activity, index) => {
                    const activityConfig = getActivityIcon(activity.type);
                    return (
                      <div
                        key={index}
                        style={styles.activityItem}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.transform = "translateX(5px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        <div style={{
                          ...styles.activityIcon,
                          background: `linear-gradient(135deg, ${activityConfig.color}30, ${activityConfig.color}15)`,
                          border: `1px solid ${activityConfig.color}`
                        }}>
                          {activityConfig.icon}
                        </div>
                        <div style={styles.activityContent}>
                          <div style={styles.activityAction}>{activity.action}</div>
                          <div style={styles.activityTime}>{activity.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Status */}
              <div style={styles.systemStatus}>
                <div style={styles.statusIndicator}>
                  <div style={styles.statusDot}></div>
                  <div style={styles.statusText}>All Systems Operational</div>
                </div>
                <div style={styles.versionInfo}>
                  Last updated: {new Date().toLocaleDateString()} • Version 2.1.0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
      `}</style>
    </>
  );
}