import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeCard, setActiveCard] = useState(null);
  const [stats, setStats] = useState([
    { label: "Active Applications", value: 0, target: 5, color: "#4facfe" },
    { label: "Messages", value: 0, target: 12, color: "#ff6b6b" },
    { label: "Notifications", value: 0, target: 8, color: "#4ade80" },
    { label: "Saved Items", value: 0, target: 15, color: "#a78bfa" }
  ]);

  const dashboardModules = [
    { 
      icon: "📚", 
      title: "Learning Hub", 
      description: "Access courses and track progress",
      color: "#4facfe",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      path: "/courses"
    },
    { 
      icon: "🏫", 
      title: "Institutions", 
      description: "Explore educational partners",
      color: "#ff6b6b",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ffa8a8 100%)",
      path: "/institutions"
    },
    { 
      icon: "💼", 
      title: "Career Portal", 
      description: "Find employment opportunities",
      color: "#4ade80",
      gradient: "linear-gradient(135deg, #4ade80 0%, #86efac 100%)",
      path: "/jobs"
    },
    { 
      icon: "👤", 
      title: "Profile Studio", 
      description: "Manage your digital presence",
      color: "#a78bfa",
      gradient: "linear-gradient(135deg, #a78bfa 0%, #c4b5fd 100%)",
      path: "/profile"
    },
    { 
      icon: "📊", 
      title: "Analytics", 
      description: "View your progress insights",
      color: "#f59e0b",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #fcd34d 100%)",
      path: "/analytics"
    },
    { 
      icon: "🔔", 
      title: "Notifications", 
      description: "Stay updated with alerts",
      color: "#ec4899",
      gradient: "linear-gradient(135deg, #ec4899 0%, #fbcfe8 100%)",
      path: "/notifications"
    }
  ];

  useEffect(() => {
    const timers = stats.map((stat, index) => {
      return setTimeout(() => {
        setStats(prev => prev.map((s, i) => 
          i === index ? { ...s, value: Math.min(s.value + 1, s.target) } : s
        ));
      }, index * 200);
    });

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
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
    floatingOrb: {
      position: "absolute",
      borderRadius: "50%",
      filter: "blur(40px)",
      opacity: 0.1,
      animation: "float 6s ease-in-out infinite"
    },
    orb1: {
      width: "300px",
      height: "300px",
      background: "#4facfe",
      top: "-150px",
      right: "-150px",
      animationDelay: "0s"
    },
    orb2: {
      width: "200px",
      height: "200px",
      background: "#ff6b6b",
      bottom: "-100px",
      left: "10%",
      animationDelay: "2s"
    },
    orb3: {
      width: "150px",
      height: "150px",
      background: "#4ade80",
      top: "50%",
      right: "10%",
      animationDelay: "4s"
    },
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
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: "2.5rem",
      marginBottom: "2rem",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      position: "relative",
      overflow: "hidden"
    },
    headerContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
      position: "relative",
      zIndex: 2
    },
    userGreeting: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem"
    },
    avatarContainer: {
      position: "relative"
    },
    userAvatar: {
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      fontWeight: 700,
      color: "white",
      boxShadow: "0 8px 25px rgba(102, 126, 234, 0.3)"
    },
    statusIndicator: {
      position: "absolute",
      bottom: "5px",
      right: "5px",
      width: "16px",
      height: "16px",
      background: "#4ade80",
      border: "2px solid white",
      borderRadius: "50%"
    },
    welcomeTitle: {
      fontSize: "2.5rem",
      fontWeight: 800,
      color: "#1a202c",
      margin: "0 0 0.5rem 0"
    },
    userName: {
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text"
    },
    welcomeSubtitle: {
      fontSize: "1.1rem",
      color: "#64748b",
      fontWeight: 500,
      margin: 0
    },
    roleBadge: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      background: "rgba(102, 126, 234, 0.1)",
      padding: "0.75rem 1.5rem",
      borderRadius: "50px",
      border: "1px solid rgba(102, 126, 234, 0.2)"
    },
    badgeText: {
      fontWeight: 600,
      color: "#667eea"
    },
    headerDecoration: {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      pointerEvents: "none"
    },
    decorationWave: {
      position: "absolute",
      top: 0,
      right: 0,
      width: "200px",
      height: "100px",
      background: "linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1))",
      borderRadius: "0 24px 0 0",
      clipPath: "polygon(100% 0, 0% 100%, 100% 100%)"
    },
    decorationDots: {
      position: "absolute",
      bottom: "2rem",
      right: "2rem",
      display: "flex",
      gap: "0.5rem"
    },
    decorationDot: {
      width: "8px",
      height: "8px",
      background: "rgba(102, 126, 234, 0.3)",
      borderRadius: "50%",
      animation: "dotPulse 2s ease-in-out infinite"
    },
    main: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gap: "2rem",
      marginBottom: "2rem"
    },
    sectionHeader: {
      marginBottom: "2rem"
    },
    sectionTitle: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "white",
      margin: "0 0 0.5rem 0"
    },
    sectionSubtitle: {
      fontSize: "1.1rem",
      color: "rgba(255, 255, 255, 0.8)",
      margin: 0
    },
    modulesGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem"
    },
    moduleCard: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      position: "relative",
      overflow: "hidden",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)"
    },
    cardBackground: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "4px",
      opacity: 0.8
    },
    cardHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1.5rem",
      position: "relative",
      zIndex: 2
    },
    moduleIcon: {
      width: "60px",
      height: "60px",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)"
    },
    moduleBadge: {
      background: "#ff6b6b",
      color: "white",
      padding: "0.25rem 0.75rem",
      borderRadius: "12px",
      fontSize: "0.8rem",
      fontWeight: 600
    },
    cardContent: {
      position: "relative",
      zIndex: 2,
      marginBottom: "1.5rem"
    },
    moduleTitle: {
      fontSize: "1.25rem",
      fontWeight: 700,
      color: "#1a202c",
      margin: "0 0 0.5rem 0"
    },
    moduleDescription: {
      fontSize: "0.9rem",
      color: "#64748b",
      lineHeight: 1.5,
      margin: 0
    },
    cardFooter: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      position: "relative",
      zIndex: 2
    },
    progressIndicator: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      flex: 1
    },
    progressBar: {
      flex: 1,
      height: "6px",
      background: "rgba(0, 0, 0, 0.1)",
      borderRadius: "3px",
      overflow: "hidden"
    },
    progressFill: {
      height: "100%",
      borderRadius: "3px",
      transition: "width 0.3s ease"
    },
    progressText: {
      fontSize: "0.8rem",
      fontWeight: 600,
      color: "#64748b",
      minWidth: "35px"
    },
    actionArrow: {
      width: "32px",
      height: "32px",
      background: "rgba(0, 0, 0, 0.1)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      color: "#64748b",
      transition: "all 0.3s ease"
    },
    hoverEffect: {
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
      transition: "left 0.5s ease"
    },
    analyticsSection: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)"
    },
    analyticsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem"
    },
    analyticsTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#1a202c",
      margin: 0
    },
    timeFilter: {
      display: "flex",
      gap: "0.5rem",
      background: "rgba(0, 0, 0, 0.05)",
      padding: "0.25rem",
      borderRadius: "12px"
    },
    filterBtn: {
      padding: "0.5rem 1rem",
      border: "none",
      background: "transparent",
      borderRadius: "8px",
      fontSize: "0.8rem",
      fontWeight: 600,
      color: "#64748b",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    statsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    },
    statCard: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1.5rem",
      background: "white",
      borderRadius: "16px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
      transition: "transform 0.3s ease"
    },
    statIcon: {
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      opacity: 0.8
    },
    statContent: {
      flex: 1
    },
    statValue: {
      fontSize: "1.5rem",
      fontWeight: 800,
      color: "#1a202c",
      marginBottom: "0.25rem"
    },
    statLabel: {
      fontSize: "0.8rem",
      color: "#64748b",
      fontWeight: 600,
      marginBottom: "0.5rem"
    },
    statProgress: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    progressTrack: {
      flex: 1,
      height: "4px",
      background: "rgba(0, 0, 0, 0.1)",
      borderRadius: "2px",
      overflow: "hidden"
    },
    progressThumb: {
      height: "100%",
      borderRadius: "2px",
      transition: "width 0.5s ease"
    },
    statTarget: {
      fontSize: "0.7rem",
      color: "#64748b",
      fontWeight: 600
    },
    statTrend: {
      fontSize: "0.8rem",
      fontWeight: 700,
      color: "#4ade80",
      background: "rgba(74, 222, 128, 0.1)",
      padding: "0.25rem 0.5rem",
      borderRadius: "6px"
    },
    activitySection: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)"
    },
    activityHeader: {
      display: "flex",
      justifycontent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem"
    },
    activityTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#1a202c",
      margin: 0
    },
    viewAllBtn: {
      background: "transparent",
      border: "none",
      color: "#667eea",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease"
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
      background: "white",
      borderRadius: "12px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
      transition: "all 0.3s ease"
    },
    activityIcon: {
      width: "40px",
      height: "40px",
      background: "rgba(102, 126, 234, 0.1)",
      borderRadius: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.1rem"
    },
    activityContent: {
      flex: 1
    },
    activityAction: {
      fontWeight: 600,
      color: "#1a202c",
      marginBottom: "0.25rem"
    },
    activityTime: {
      fontSize: "0.8rem",
      color: "#64748b"
    },
    activityBadge: {
      width: "8px",
      height: "8px",
      background: "#4ade80",
      borderRadius: "50%"
    },
    footer: {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "1.5rem 2rem",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)"
    },
    quickActions: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center"
    },
    actionBtn: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "1rem 2rem",
      border: "none",
      borderRadius: "12px",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      fontSize: "0.9rem"
    },
    primaryBtn: {
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "white",
      boxShadow: "0 8px 20px rgba(102, 126, 234, 0.3)"
    },
    secondaryBtn: {
      background: "white",
      color: "#64748b",
      border: "1px solid #e2e8f0"
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.background}>
        <div style={{...styles.floatingOrb, ...styles.orb1}}></div>
        <div style={{...styles.floatingOrb, ...styles.orb2}}></div>
        <div style={{...styles.floatingOrb, ...styles.orb3}}></div>
        <div style={styles.gridPattern}></div>
      </div>

      <div style={styles.content}>
        {/* Welcome Header */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.userGreeting}>
              <div style={styles.avatarContainer}>
                <div style={styles.userAvatar}>
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div style={styles.statusIndicator}></div>
              </div>
              <div style={styles.greetingText}>
                <h1 style={styles.welcomeTitle}>
                  Welcome back, <span style={styles.userName}>{user?.name}</span>
                </h1>
                <p style={styles.welcomeSubtitle}>
                  Ready to continue your journey today?
                </p>
              </div>
            </div>
            <div style={styles.roleBadge}>
              <span style={{marginRight: "0.5rem"}}>🎯</span>
              <span style={styles.badgeText}>{user?.role}</span>
            </div>
          </div>
          
          <div style={styles.headerDecoration}>
            <div style={styles.decorationWave}></div>
            <div style={styles.decorationDots}>
              {[...Array(5)].map((_, i) => (
                <div 
                  key={i} 
                  style={{
                    ...styles.decorationDot,
                    animationDelay: `${i * 0.2}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        </header>

        {/* Main Dashboard Grid */}
        <main style={styles.main}>
          <section style={{gridColumn: 1}}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Your Workspace</h2>
              <p style={styles.sectionSubtitle}>Everything you need in one place</p>
            </div>

            <div style={styles.modulesGrid}>
              {dashboardModules.map((module, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.moduleCard,
                    transform: activeCard === index ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
                    boxShadow: activeCard === index ? "0 25px 50px rgba(0, 0, 0, 0.15)" : "0 8px 25px rgba(0, 0, 0, 0.1)"
                  }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                  onClick={() => console.log(`Navigating to: ${module.path}`)}
                >
                  <div style={{...styles.cardBackground, background: module.gradient}}></div>
                  
                  <div style={styles.cardHeader}>
                    <div style={{...styles.moduleIcon, background: module.gradient}}>
                      {module.icon}
                    </div>
                    <div style={styles.moduleBadge}>New</div>
                  </div>

                  <div style={styles.cardContent}>
                    <h3 style={styles.moduleTitle}>{module.title}</h3>
                    <p style={styles.moduleDescription}>{module.description}</p>
                  </div>

                  <div style={styles.cardFooter}>
                    <div style={styles.progressIndicator}>
                      <div style={styles.progressBar}>
                        <div 
                          style={{
                            ...styles.progressFill,
                            background: module.gradient,
                            width: `${(index * 20 + 30)}%`
                          }}
                        ></div>
                      </div>
                      <span style={styles.progressText}>{index * 20 + 30}%</span>
                    </div>
                    <div style={{
                      ...styles.actionArrow,
                      background: activeCard === index ? "linear-gradient(135deg, #667eea, #764ba2)" : "rgba(0, 0, 0, 0.1)",
                      color: activeCard === index ? "white" : "#64748b",
                      transform: activeCard === index ? "translateX(5px)" : "translateX(0)"
                    }}>
                      →
                    </div>
                  </div>

                  <div style={{
                    ...styles.hoverEffect,
                    left: activeCard === index ? "100%" : "-100%"
                  }}></div>
                </div>
              ))}
            </div>
          </section>

          {/* Analytics Section */}
          <section style={styles.analyticsSection}>
            <div style={styles.analyticsHeader}>
              <h3 style={styles.analyticsTitle}>Quick Insights</h3>
              <div style={styles.timeFilter}>
                <button style={{...styles.filterBtn, background: "white", color: "#667eea", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"}}>Weekly</button>
                <button style={styles.filterBtn}>Monthly</button>
                <button style={styles.filterBtn}>Yearly</button>
              </div>
            </div>

            <div style={styles.statsGrid}>
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  style={styles.statCard}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={{...styles.statIcon, background: stat.color}}></div>
                  <div style={styles.statContent}>
                    <div style={styles.statValue}>{stat.value}</div>
                    <div style={styles.statLabel}>{stat.label}</div>
                    <div style={styles.statProgress}>
                      <div style={styles.progressTrack}>
                        <div 
                          style={{
                            ...styles.progressThumb,
                            width: `${(stat.value / stat.target) * 100}%`,
                            background: stat.color
                          }}
                        ></div>
                      </div>
                      <span style={styles.statTarget}>{stat.target}</span>
                    </div>
                  </div>
                  <div style={styles.statTrend}>
                    +{Math.floor((stat.value / stat.target) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Activity */}
          <section style={{...styles.activitySection, gridColumn: "1 / -1"}}>
            <div style={styles.activityHeader}>
              <h3 style={styles.activityTitle}>Recent Activity</h3>
              <button 
                style={styles.viewAllBtn}
                onMouseOver={(e) => {
                  e.target.style.transform = "translateX(5px)";
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = "translateX(0)";
                }}
              >
                View All →
              </button>
            </div>
            <div style={styles.activityList}>
              {[
                { action: "Applied to Computer Science", time: "2 hours ago", icon: "📝" },
                { action: "Completed Web Development", time: "1 day ago", icon: "✅" },
                { action: "Received new message", time: "2 days ago", icon: "💬" },
                { action: "Profile updated", time: "3 days ago", icon: "👤" }
              ].map((activity, index) => (
                <div 
                  key={index} 
                  style={styles.activityItem}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateX(5px)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateX(0)";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.05)";
                  }}
                >
                  <div style={styles.activityIcon}>{activity.icon}</div>
                  <div style={styles.activityContent}>
                    <div style={styles.activityAction}>{activity.action}</div>
                    <div style={styles.activityTime}>{activity.time}</div>
                  </div>
                  <div style={styles.activityBadge}></div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Quick Actions Footer */}
        <footer style={styles.footer}>
          <div style={styles.quickActions}>
            <button 
              style={{...styles.actionBtn, ...styles.primaryBtn}}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(102, 126, 234, 0.4)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.3)";
              }}
            >
              <span style={{marginRight: "0.5rem"}}>🚀</span>
              Quick Start
            </button>
            <button 
              style={{...styles.actionBtn, ...styles.secondaryBtn}}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.color = "#667eea";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.color = "#64748b";
              }}
            >
              <span style={{marginRight: "0.5rem"}}>📋</span>
              Create New
            </button>
            <button 
              style={{...styles.actionBtn, ...styles.secondaryBtn}}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.1)";
                e.currentTarget.style.borderColor = "#667eea";
                e.currentTarget.style.color = "#667eea";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "#e2e8f0";
                e.currentTarget.style.color = "#64748b";
              }}
            >
              <span style={{marginRight: "0.5rem"}}>🔍</span>
              Search
            </button>
          </div>
        </footer>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;