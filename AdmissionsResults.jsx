// src/pages/student/AdmissionsResults.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function AdmissionsResults() {
  const { applications } = useAppData();
  const { user } = useAuth();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [animatedStats, setAnimatedStats] = useState({ pending: 0, admitted: 0, rejected: 0, total: 0 });

  const studentApps = applications.filter(a => a.studentId === user.id.toString());

  const statusFilters = [
    { key: "all", label: "All Applications", icon: "📊", color: "#4facfe" },
    { key: "pending", label: "Under Review", icon: "⏳", color: "#f59e0b" },
    { key: "admitted", label: "Accepted", icon: "✅", color: "#10b981" },
    { key: "rejected", label: "Not Accepted", icon: "❌", color: "#ef4444" }
  ];

  const filteredApps = selectedStatus === "all" 
    ? studentApps 
    : studentApps.filter(app => app.status === selectedStatus);

  const getStatusConfig = (status) => {
    switch (status) {
      case "admitted":
        return { 
          color: "#10b981", 
          bgColor: "rgba(16, 185, 129, 0.1)", 
          icon: "🎉", 
          label: "Accepted",
          gradient: "linear-gradient(135deg, #10b981, #34d399)"
        };
      case "rejected":
        return { 
          color: "#ef4444", 
          bgColor: "rgba(239, 68, 68, 0.1)", 
          icon: "📝", 
          label: "Not Accepted",
          gradient: "linear-gradient(135deg, #ef4444, #f87171)"
        };
      default:
        return { 
          color: "#f59e0b", 
          bgColor: "rgba(245, 158, 11, 0.1)", 
          icon: "⏳", 
          label: "Under Review",
          gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)"
        };
    }
  };

  useEffect(() => {
    // Animate stats counting up
    const targetStats = {
      pending: studentApps.filter(a => a.status === "pending").length,
      admitted: studentApps.filter(a => a.status === "admitted").length,
      rejected: studentApps.filter(a => a.status === "rejected").length,
      total: studentApps.length
    };

    const duration = 1000;
    const steps = 20;
    const stepDuration = duration / steps;

    Object.keys(targetStats).forEach(stat => {
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const currentValue = Math.floor(targetStats[stat] * progress);
        
        setAnimatedStats(prev => ({
          ...prev,
          [stat]: currentValue
        }));

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, [studentApps.length]);

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
    floatingElement: {
      position: "absolute",
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.05) 100%)",
      animation: "float 8s ease-in-out infinite"
    },
    element1: { width: "300px", height: "300px", top: "-100px", right: "-50px", animationDelay: "0s" },
    element2: { width: "200px", height: "200px", bottom: "-80px", left: "10%", animationDelay: "3s" },
    element3: { width: "150px", height: "150px", top: "40%", right: "20%", animationDelay: "6s" },
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
      maxWidth: "1200px",
      margin: "0 auto"
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem"
    },
    headerIcon: {
      width: "100px",
      height: "100px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      borderRadius: "25px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      margin: "0 auto 2rem",
      boxShadow: "0 20px 40px rgba(102, 126, 234, 0.3)",
      animation: "bounce 2s ease-in-out infinite"
    },
    title: {
      fontSize: "3.5rem",
      fontWeight: 800,
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "1rem"
    },
    subtitle: {
      fontSize: "1.3rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500,
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: 1.6
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1.5rem",
      marginBottom: "3rem"
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
      fontSize: "2.5rem",
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
    filterBar: {
      display: "flex",
      gap: "1rem",
      marginBottom: "2rem",
      flexWrap: "wrap",
      justifyContent: "center"
    },
    filterButton: {
      padding: "1rem 2rem",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    applicationsGrid: {
      display: "grid",
      gap: "1.5rem"
    },
    applicationCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    appHeader: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1.5rem",
      marginBottom: "1.5rem"
    },
    statusIndicator: {
      width: "80px",
      height: "80px",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      flexShrink: 0
    },
    appDetails: {
      flex: 1
    },
    courseTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
      color: "white"
    },
    metaInfo: {
      display: "flex",
      gap: "2rem",
      flexWrap: "wrap",
      marginBottom: "1rem"
    },
    metaItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500
    },
    statusBadge: {
      padding: "0.75rem 1.5rem",
      borderRadius: "25px",
      fontSize: "0.9rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      border: "1px solid",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    emptyState: {
      textAlign: "center",
      padding: "4rem 2rem",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    emptyIcon: {
      fontSize: "4rem",
      marginBottom: "1.5rem",
      opacity: 0.5
    },
    emptyTitle: {
      fontSize: "1.8rem",
      fontWeight: 700,
      marginBottom: "1rem",
      color: "white"
    },
    emptyText: {
      fontSize: "1.1rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500,
      maxWidth: "400px",
      margin: "0 auto",
      lineHeight: 1.6
    },
    helpSection: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginTop: "3rem"
    },
    helpTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    },
    helpGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem"
    },
    helpItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem"
    },
    helpIcon: {
      fontSize: "1.5rem",
      flexShrink: 0
    },
    helpContent: {
      flex: 1
    },
    helpStatus: {
      fontSize: "1rem",
      fontWeight: 700,
      marginBottom: "0.25rem",
      color: "white"
    },
    helpDesc: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      lineHeight: 1.5
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        {/* Animated Background */}
        <div style={styles.background}>
          <div style={{...styles.floatingElement, ...styles.element1}}></div>
          <div style={{...styles.floatingElement, ...styles.element2}}></div>
          <div style={{...styles.floatingElement, ...styles.element3}}></div>
          <div style={styles.gridPattern}></div>
        </div>

        <div style={styles.content}>
          {/* Header Section */}
          <header style={styles.header}>
            <div style={styles.headerIcon}>🎓</div>
            <h1 style={styles.title}>Admissions Journey</h1>
            <p style={styles.subtitle}>
              Track your application progress and discover your academic future
            </p>
          </header>

          {/* Statistics Overview */}
          {studentApps.length > 0 && (
            <div style={styles.statsGrid}>
              {[
                { 
                  key: "pending", 
                  icon: "⏳", 
                  color: "#f59e0b",
                  label: "UNDER REVIEW"
                },
                { 
                  key: "admitted", 
                  icon: "🎉", 
                  color: "#10b981",
                  label: "ACCEPTED"
                },
                { 
                  key: "rejected", 
                  icon: "📝", 
                  color: "#ef4444",
                  label: "NOT ACCEPTED"
                },
                { 
                  key: "total", 
                  icon: "📊", 
                  color: "#4facfe",
                  label: "TOTAL APPLICATIONS"
                }
              ].map((stat, index) => (
                <div
                  key={stat.key}
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
                    {animatedStats[stat.key]}
                  </div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Filter Bar */}
          <div style={styles.filterBar}>
            {statusFilters.map((filter) => (
              <button
                key={filter.key}
                style={{
                  ...styles.filterButton,
                  background: selectedStatus === filter.key 
                    ? `linear-gradient(135deg, ${filter.color}, ${filter.color}80)`
                    : "rgba(255, 255, 255, 0.05)",
                  borderColor: selectedStatus === filter.key ? filter.color : "rgba(255, 255, 255, 0.1)",
                  color: selectedStatus === filter.key ? "white" : "rgba(255, 255, 255, 0.7)",
                  transform: selectedStatus === filter.key ? "scale(1.05)" : "scale(1)"
                }}
                onClick={() => setSelectedStatus(filter.key)}
              >
                <span>{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>

          {/* Applications List */}
          <div style={styles.applicationsGrid}>
            {filteredApps.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  {selectedStatus === "all" ? "📭" : "🔍"}
                </div>
                <h3 style={styles.emptyTitle}>
                  {selectedStatus === "all" 
                    ? "No Applications Yet" 
                    : `No ${statusFilters.find(f => f.key === selectedStatus)?.label}`}
                </h3>
                <p style={styles.emptyText}>
                  {selectedStatus === "all"
                    ? "Start your academic journey by applying to courses. Your admission results will appear here."
                    : `No applications found with this status. Try changing the filter to see other results.`}
                </p>
              </div>
            ) : (
              filteredApps.map((app) => {
                const statusConfig = getStatusConfig(app.status);
                return (
                  <div
                    key={app.id}
                    style={{
                      ...styles.applicationCard,
                      background: `linear-gradient(135deg, ${statusConfig.color}10, ${statusConfig.color}05)`,
                      borderColor: `${statusConfig.color}30`
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-5px) scale(1.02)";
                      e.currentTarget.style.background = `linear-gradient(135deg, ${statusConfig.color}15, ${statusConfig.color}08)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.background = `linear-gradient(135deg, ${statusConfig.color}10, ${statusConfig.color}05)`;
                    }}
                  >
                    <div style={styles.appHeader}>
                      <div style={{
                        ...styles.statusIndicator,
                        background: statusConfig.gradient
                      }}>
                        {statusConfig.icon}
                      </div>
                      
                      <div style={styles.appDetails}>
                        <h3 style={styles.courseTitle}>{app.courseTitle}</h3>
                        <div style={styles.metaInfo}>
                          <div style={styles.metaItem}>
                            <span>🏫</span>
                            {app.institutionName}
                          </div>
                          <div style={styles.metaItem}>
                            <span>📅</span>
                            Applied {new Date(app.appliedDate).toLocaleDateString()}
                          </div>
                          <div style={styles.metaItem}>
                            <span>🆔</span>
                            Application #{app.id.slice(0, 8)}
                          </div>
                        </div>
                      </div>

                      <div style={{
                        ...styles.statusBadge,
                        background: statusConfig.gradient,
                        borderColor: statusConfig.color
                      }}>
                        {statusConfig.icon}
                        {statusConfig.label}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div style={{
                      width: "100%",
                      height: "4px",
                      background: "rgba(255, 255, 255, 0.1)",
                      borderRadius: "2px",
                      overflow: "hidden"
                    }}>
                      <div style={{
                        width: app.status === "admitted" ? "100%" : app.status === "rejected" ? "100%" : "60%",
                        height: "100%",
                        background: statusConfig.gradient,
                        transition: "width 1s ease",
                        borderRadius: "2px"
                      }}></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Help Section */}
          <div style={styles.helpSection}>
            <h3 style={styles.helpTitle}>
              <span style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #a78bfa, #c4b5fd)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem"
              }}>💡</span>
              Understanding Your Application Status
            </h3>
            <div style={styles.helpGrid}>
              {[
                { icon: "⏳", status: "Under Review", desc: "Your application is being evaluated by the institution" },
                { icon: "🎉", status: "Accepted", desc: "Congratulations! You've been admitted to the program" },
                { icon: "📝", status: "Not Accepted", desc: "Your application wasn't successful this time" }
              ].map((item, index) => (
                <div key={index} style={styles.helpItem}>
                  <div style={styles.helpIcon}>{item.icon}</div>
                  <div style={styles.helpContent}>
                    <div style={styles.helpStatus}>{item.status}</div>
                    <div style={styles.helpDesc}>{item.desc}</div>
                  </div>
                </div>
              ))}
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
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
          40% { transform: translateY(-10px) scale(1.05); }
          60% { transform: translateY(-5px) scale(1.02); }
        }
      `}</style>
    </>
  );
}