import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function CompanyDashboard() {
  const { user } = useAuth();
  const [activeCard, setActiveCard] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const links = [
    { 
      to: "/company/post-job", 
      label: "Post Job", 
      icon: "🚀", 
      color: "#4facfe",
      description: "Create compelling job postings with AI-powered optimization"
    },
    { 
      to: "/company/applicants", 
      label: "View Applicants", 
      icon: "👥", 
      color: "#ff6b6b",
      description: "Smart filtering and ranking of qualified candidates"
    },
    { 
      to: "/company/profile", 
      label: "Update Profile", 
      icon: "🏢", 
      color: "#4ade80",
      description: "Enhance your company branding and hiring preferences"
    },
    { 
      to: "/company/settings", 
      label: "Settings", 
      icon: "⚙️", 
      color: "#a78bfa",
      description: "Customize security, notifications, and team access"
    },
  ];

  const stats = [
    { 
      label: "Active Jobs", 
      value: "12", 
      icon: "💼", 
      color: "#4facfe",
      trend: "+2 this week"
    },
    { 
      label: "New Applicants", 
      value: "45", 
      icon: "📨", 
      color: "#ff6b6b",
      trend: "12 unread"
    },
    { 
      label: "Interviews", 
      value: "8", 
      icon: "🤝", 
      color: "#4ade80",
      trend: "3 scheduled"
    },
    { 
      label: "Hired", 
      value: "15", 
      icon: "🎉", 
      color: "#a78bfa",
      trend: "87% success rate"
    }
  ];

  const recentActivities = [
    { action: "New application received", time: "2 min ago", type: "applicant" },
    { action: "Job posting approved", time: "1 hour ago", type: "job" },
    { action: "Interview scheduled", time: "3 hours ago", type: "interview" },
    { action: "Profile updated", time: "1 day ago", type: "profile" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
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
    main: {
      flex: 1,
      padding: "2rem",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      position: "relative",
      zIndex: 1,
      borderLeft: "1px solid rgba(255, 255, 255, 0.1)"
    },
    welcomeHeader: {
      background: "linear-gradient(135deg, rgba(79, 172, 254, 0.2) 0%, rgba(0, 242, 254, 0.1) 100%)",
      padding: "3rem",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.15)",
      color: "white",
      position: "relative",
      overflow: "hidden",
      backdropFilter: "blur(10px)"
    },
    welcomeTitle: {
      fontSize: "3rem",
      fontWeight: 900,
      marginBottom: "1rem",
      background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow: "0 4px 20px rgba(0,0,0,0.3)"
    },
    welcomeSubtitle: {
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
      marginBottom: "1rem"
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
    featuresGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem"
    },
    featureCard: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2rem",
      borderRadius: "20px",
      textDecoration: "none",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    featureIcon: {
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
    featureContent: {
      flex: 1
    },
    featureTitle: {
      fontSize: "1.4rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "0.5rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    featureDescription: {
      fontSize: "0.95rem",
      color: "rgba(255, 255, 255, 0.7)",
      lineHeight: 1.5,
      fontWeight: 500
    },
    featureArrow: {
      fontSize: "1.5rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 700,
      transition: "all 0.3s ease"
    },
    activitiesSection: {
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
    footer: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "1.5rem",
      borderRadius: "15px",
      textAlign: "center",
      marginTop: "auto",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)"
    },
    footerText: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500,
      margin: 0
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case "applicant": return { icon: "👤", color: "#4facfe" };
      case "job": return { icon: "💼", color: "#4ade80" };
      case "interview": return { icon: "🤝", color: "#a78bfa" };
      case "profile": return { icon: "🏢", color: "#ff6b6b" };
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

        <Sidebar links={links} />

        <main style={styles.main}>
          {/* Welcome Header */}
          <div style={styles.welcomeHeader}>
            <div style={styles.timeDisplay}>
              🕒 {currentTime.toLocaleTimeString()}
            </div>
            <h1 style={styles.welcomeTitle}>
              Welcome back, {user?.name}! 🎯
            </h1>
            <p style={styles.welcomeSubtitle}>
              Your recruitment command center is ready. Streamline hiring, discover top talent, 
              and build your dream team with intelligent candidate matching.
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

          {/* Main Feature Cards */}
          <div style={styles.featuresGrid}>
            {links.map((link, index) => {
              const isActive = activeCard === index;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  style={{
                    ...styles.featureCard,
                    background: isActive 
                      ? `linear-gradient(135deg, ${link.color}20, ${link.color}08)`
                      : "rgba(255, 255, 255, 0.08)",
                    borderColor: isActive ? link.color : "rgba(255, 255, 255, 0.1)",
                    transform: isActive ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)",
                    boxShadow: isActive ? `0 20px 40px ${link.color}20` : "none"
                  }}
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <div style={{
                    ...styles.featureIcon,
                    background: `linear-gradient(135deg, ${link.color}30, ${link.color}15)`,
                    borderColor: link.color,
                    transform: isActive ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0deg)"
                  }}>
                    {link.icon}
                  </div>
                  <div style={styles.featureContent}>
                    <h3 style={styles.featureTitle}>{link.label}</h3>
                    <p style={styles.featureDescription}>{link.description}</p>
                  </div>
                  <div style={{
                    ...styles.featureArrow,
                    transform: isActive ? "translateX(5px)" : "translateX(0)",
                    color: isActive ? link.color : "rgba(255, 255, 255, 0.7)"
                  }}>
                    →
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Recent Activities */}
          <div style={styles.activitiesSection}>
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

          {/* Quick Actions Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              🚀 Enterprise Recruitment Platform • Last login: {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })} • 
              Need assistance? Contact our 24/7 support team at support@careerlaunch.co.ls
            </p>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
    </>
  );
}