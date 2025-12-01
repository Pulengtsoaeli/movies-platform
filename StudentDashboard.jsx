import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

export default function StudentDashboard() {
  const [activeModule, setActiveModule] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [progress, setProgress] = useState(0);

  const userStats = {
    completed: 12,
    inProgress: 5,
    pending: 3,
    achievements: 8
  };

  const quickActions = [
    {
      icon: "🚀",
      title: "Quick Apply",
      description: "Apply to featured programs",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      action: "/student/apply"
    },
    {
      icon: "📊",
      title: "Progress Track",
      description: "View your application status",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      action: "/student/admissions"
    },
    {
      icon: "💼",
      title: "Career Match",
      description: "Find matching job opportunities",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      action: "/student/jobs"
    },
    {
      icon: "📚",
      title: "Learning Path",
      description: "Continue your courses",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
      action: "/student/courses"
    }
  ];

  const modules = [
    {
      icon: "👤",
      title: "Digital Profile",
      subtitle: "Manage your identity",
      progress: 85,
      color: "#8B5CF6",
      to: "/student/profile"
    },
    {
      icon: "📝",
      title: "Applications",
      subtitle: "Track submissions",
      progress: 60,
      color: "#3B82F6",
      to: "/student/apply"
    },
    {
      icon: "🎓",
      title: "Admissions",
      subtitle: "View acceptances",
      progress: 45,
      color: "#10B981",
      to: "/student/admissions"
    },
    {
      icon: "💼",
      title: "Career Hub",
      subtitle: "Explore opportunities",
      progress: 30,
      color: "#F59E0B",
      to: "/student/jobs"
    },
    {
      icon: "📄",
      title: "Documents",
      subtitle: "Manage files",
      progress: 75,
      color: "#EF4444",
      to: "/student/transcripts"
    },
    {
      icon: "⭐",
      title: "Achievements",
      subtitle: "Your milestones",
      progress: 90,
      color: "#EC4899",
      to: "/student/achievements"
    }
  ];

  const recentActivity = [
    { action: "Application submitted to Computer Science", time: "2 hours ago", status: "pending" },
    { action: "Document approved: Transcript", time: "1 day ago", status: "completed" },
    { action: "New job match: Frontend Developer", time: "2 days ago", status: "new" },
    { action: "Profile completeness increased to 85%", time: "3 days ago", status: "update" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    const progressTimer = setTimeout(() => setProgress(100), 500);

    return () => {
      clearInterval(timer);
      clearTimeout(progressTimer);
    };
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
    backgroundElements: {
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
      animation: "float 6s ease-in-out infinite"
    },
    shape1: { width: "400px", height: "400px", top: "-200px", right: "-100px", animationDelay: "0s" },
    shape2: { width: "300px", height: "300px", bottom: "-150px", left: "-50px", animationDelay: "2s" },
    shape3: { width: "200px", height: "200px", top: "50%", right: "20%", animationDelay: "4s" },
    gridOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 0%, transparent 50%),
                        radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)`
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
    headerSection: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "1rem"
    },
    welcomeSection: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: "2.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)"
    },
    welcomeTitle: {
      fontSize: "3rem",
      fontWeight: 800,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "0.5rem"
    },
    welcomeSubtitle: {
      fontSize: "1.2rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500,
      marginBottom: "2rem"
    },
    timeDisplay: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.5)",
      fontWeight: 600
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: "1rem",
      marginBottom: "2rem"
    },
    statItem: {
      textAlign: "center",
      padding: "1.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "16px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease"
    },
    statNumber: {
      fontSize: "2.5rem",
      fontWeight: 800,
      marginBottom: "0.5rem"
    },
    statLabel: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 600
    },
    quickActions: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem"
    },
    actionCard: {
      padding: "2rem",
      borderRadius: "20px",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden"
    },
    actionIcon: {
      fontSize: "3rem",
      marginBottom: "1rem"
    },
    actionTitle: {
      fontSize: "1.3rem",
      fontWeight: 700,
      marginBottom: "0.5rem"
    },
    actionDescription: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      lineHeight: 1.5
    },
    modulesSection: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem"
    },
    moduleCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      position: "relative",
      overflow: "hidden"
    },
    moduleHeader: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1.5rem"
    },
    moduleIcon: {
      width: "60px",
      height: "60px",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.8rem",
      background: "rgba(255, 255, 255, 0.1)"
    },
    moduleTitle: {
      fontSize: "1.3rem",
      fontWeight: 700,
      marginBottom: "0.25rem"
    },
    moduleSubtitle: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)"
    },
    progressBar: {
      width: "100%",
      height: "6px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "3px",
      overflow: "hidden",
      marginBottom: "1rem"
    },
    progressFill: {
      height: "100%",
      borderRadius: "3px",
      transition: "width 1s ease"
    },
    progressText: {
      fontSize: "0.8rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 600
    },
    activitySection: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    activityTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "1.5rem"
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
      background: "rgba(255, 255, 255, 0.03)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.05)"
    },
    activityDot: {
      width: "8px",
      height: "8px",
      borderRadius: "50%"
    },
    activityContent: {
      flex: 1
    },
    activityAction: {
      fontSize: "0.9rem",
      fontWeight: 600,
      marginBottom: "0.25rem"
    },
    activityTime: {
      fontSize: "0.8rem",
      color: "rgba(255, 255, 255, 0.5)"
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'new': return '#3B82F6';
      case 'update': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        {/* Background Elements */}
        <div style={styles.backgroundElements}>
          <div style={{...styles.floatingShape, ...styles.shape1}}></div>
          <div style={{...styles.floatingShape, ...styles.shape2}}></div>
          <div style={{...styles.floatingShape, ...styles.shape3}}></div>
          <div style={styles.gridOverlay}></div>
        </div>

        <div style={styles.mainLayout}>
          <Sidebar links={modules.map(m => ({ to: m.to, label: m.title, icon: m.icon }))} />
          <div style={styles.contentArea}>
            {/* Header Section */}
            <div style={styles.headerSection}>
              <div>
                <div style={styles.welcomeTitle}>
                  Welcome Back, Student!
                </div>
                <div style={styles.welcomeSubtitle}>
                  Continue your journey to academic and career success
                </div>
              </div>
              <div style={styles.timeDisplay}>
                {currentTime.toLocaleTimeString()}
              </div>
            </div>

            {/* Stats Overview */}
            <div style={styles.statsGrid}>
              {Object.entries(userStats).map(([key, value]) => (
                <div 
                  key={key}
                  style={styles.statItem}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                    e.currentTarget.style.transform = "translateY(-5px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div style={styles.statNumber}>{value}</div>
                  <div style={styles.statLabel}>
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={styles.quickActions}>
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.action}
                  style={{
                    ...styles.actionCard,
                    background: action.color
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                  }}
                >
                  <div style={styles.actionIcon}>{action.icon}</div>
                  <div style={styles.actionTitle}>{action.title}</div>
                  <div style={styles.actionDescription}>{action.description}</div>
                </Link>
              ))}
            </div>

            {/* Main Modules Grid */}
            <div style={styles.modulesSection}>
              {modules.map((module, index) => (
                <Link
                  key={index}
                  to={module.to}
                  style={{
                    ...styles.moduleCard,
                    transform: activeModule === index ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)",
                    borderColor: activeModule === index ? module.color : "rgba(255, 255, 255, 0.1)"
                  }}
                  onMouseEnter={() => setActiveModule(index)}
                  onMouseLeave={() => setActiveModule(null)}
                >
                  <div style={styles.moduleHeader}>
                    <div style={{...styles.moduleIcon, color: module.color}}>
                      {module.icon}
                    </div>
                    <div>
                      <div style={styles.moduleTitle}>{module.title}</div>
                      <div style={styles.moduleSubtitle}>{module.subtitle}</div>
                    </div>
                  </div>
                  
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${module.progress}%`,
                        background: module.color
                      }}
                    ></div>
                  </div>
                  
                  <div style={styles.progressText}>
                    {module.progress}% Complete
                  </div>

                  {/* Hover Glow Effect */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `radial-gradient(circle at center, ${module.color}15 0%, transparent 70%)`,
                    opacity: activeModule === index ? 1 : 0,
                    transition: "opacity 0.3s ease"
                  }}></div>
                </Link>
              ))}
            </div>

            {/* Recent Activity */}
            <div style={styles.activitySection}>
              <div style={styles.activityTitle}>Recent Activity</div>
              <div style={styles.activityList}>
                {recentActivity.map((activity, index) => (
                  <div key={index} style={styles.activityItem}>
                    <div style={{
                      ...styles.activityDot,
                      background: getStatusColor(activity.status)
                    }}></div>
                    <div style={styles.activityContent}>
                      <div style={styles.activityAction}>{activity.action}</div>
                      <div style={styles.activityTime}>{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
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
        
        @keyframes glow {
          0%, 100% { 
            opacity: 0.5; 
          }
          50% { 
            opacity: 0.8; 
          }
        }
      `}</style>
    </>
  );
}