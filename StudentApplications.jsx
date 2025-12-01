import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function StudentApplications() {
  const { applications, updateApplication, admitApplication } = useAppData();
  const { user } = useAuth();
  const [activeCard, setActiveCard] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    pending: 0,
    admitted: 0,
    rejected: 0,
    total: 0
  });

  // Filter applications for current institution
  const myApplications = applications.filter(a => a.institutionId === user.id);

  const filteredApplications = myApplications.filter(app => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch = app.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicationText?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && (searchTerm === "" || matchesSearch);
  });

  useEffect(() => {
    setStats({
      pending: myApplications.filter(a => a.status === "pending").length,
      admitted: myApplications.filter(a => a.status === "admitted").length,
      rejected: myApplications.filter(a => a.status === "rejected").length,
      total: myApplications.length
    });
  }, [myApplications]);

  const handleAdmit = (id) => {
    admitApplication(id);
    alert("🎓 Student admitted successfully! Other conflicting applications from this student have been automatically rejected.");
  };

  const handleReject = (id) => {
    updateApplication(id, { status: "rejected" });
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "admitted":
        return { 
          color: "#10b981", 
          bgColor: "rgba(16, 185, 129, 0.1)", 
          icon: "🎓", 
          label: "Admitted",
          gradient: "linear-gradient(135deg, #10b981, #34d399)"
        };
      case "rejected":
        return { 
          color: "#ef4444", 
          bgColor: "rgba(239, 68, 68, 0.1)", 
          icon: "❌", 
          label: "Rejected",
          gradient: "linear-gradient(135deg, #ef4444, #f87171)"
        };
      default:
        return { 
          color: "#f59e0b", 
          bgColor: "rgba(245, 158, 11, 0.1)", 
          icon: "⏳", 
          label: "Pending Review",
          gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)"
        };
    }
  };

  const filters = [
    { key: "all", label: "All Applications", icon: "📊", color: "#4facfe" },
    { key: "pending", label: "Pending Review", icon: "⏳", color: "#f59e0b" },
    { key: "admitted", label: "Admitted", icon: "🎓", color: "#10b981" },
    { key: "rejected", label: "Rejected", icon: "❌", color: "#ef4444" }
  ];

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)",
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
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)",
      animation: "float 10s ease-in-out infinite"
    },
    shape1: { width: "450px", height: "450px", top: "-180px", left: "-120px", animationDelay: "0s" },
    shape2: { width: "350px", height: "350px", bottom: "-130px", right: "-90px", animationDelay: "3s" },
    shape3: { width: "250px", height: "250px", top: "30%", right: "20%", animationDelay: "6s" },
    gridPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      backgroundSize: "55px 55px"
    },
    content: {
      position: "relative",
      zIndex: 1,
      padding: "2rem",
      maxWidth: "1300px",
      margin: "0 auto"
    },
    header: {
      textAlign: "center",
      marginBottom: "3rem"
    },
    headerIcon: {
      width: "110px",
      height: "110px",
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      borderRadius: "28px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3.5rem",
      margin: "0 auto 2rem",
      boxShadow: "0 22px 45px rgba(79, 172, 254, 0.35)",
      animation: "bounce 2.5s ease-in-out infinite"
    },
    title: {
      fontSize: "3.8rem",
      fontWeight: 900,
      background: "linear-gradient(135deg, #fff 0%, #bae6fd 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      marginBottom: "1rem",
      textShadow: "0 4px 25px rgba(0,0,0,0.4)"
    },
    subtitle: {
      fontSize: "1.35rem",
      color: "rgba(255, 255, 255, 0.85)",
      fontWeight: 500,
      maxWidth: "550px",
      margin: "0 auto",
      lineHeight: 1.6
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1.75rem",
      marginBottom: "2.5rem"
    },
    statCard: {
      background: "rgba(255, 255, 255, 0.07)",
      backdropFilter: "blur(22px)",
      padding: "2.25rem",
      borderRadius: "22px",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      textAlign: "center",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    statIcon: {
      fontSize: "2.8rem",
      marginBottom: "1.25rem",
      filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))"
    },
    statValue: {
      fontSize: "2.5rem",
      fontWeight: 900,
      marginBottom: "0.6rem",
      textShadow: "0 2px 8px rgba(0,0,0,0.3)"
    },
    statLabel: {
      fontSize: "0.95rem",
      color: "rgba(255, 255, 255, 0.8)",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.8px"
    },
    controlsSection: {
      background: "rgba(255, 255, 255, 0.07)",
      backdropFilter: "blur(22px)",
      borderRadius: "22px",
      padding: "2.25rem",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      marginBottom: "2.5rem"
    },
    searchContainer: {
      display: "flex",
      gap: "1.25rem",
      marginBottom: "1.75rem"
    },
    searchInput: {
      flex: 1,
      padding: "1.15rem 1.75rem",
      background: "rgba(255, 255, 255, 0.09)",
      border: "2px solid rgba(255, 255, 255, 0.18)",
      borderRadius: "18px",
      color: "white",
      fontSize: "1.05rem",
      fontWeight: 500,
      transition: "all 0.3s ease"
    },
    filterTabs: {
      display: "flex",
      gap: "1.1rem",
      flexWrap: "wrap"
    },
    filterTab: {
      padding: "1.1rem 1.75rem",
      background: "rgba(255, 255, 255, 0.07)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      borderRadius: "14px",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.9rem",
      fontSize: "0.95rem"
    },
    applicationsGrid: {
      display: "grid",
      gap: "1.75rem",
      marginBottom: "3.5rem"
    },
    applicationCard: {
      background: "rgba(255, 255, 255, 0.07)",
      backdropFilter: "blur(22px)",
      borderRadius: "22px",
      padding: "2.75rem",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    appHeader: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1.75rem",
      marginBottom: "2.25rem"
    },
    studentAvatar: {
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.2rem",
      boxShadow: "0 10px 25px rgba(79, 172, 254, 0.35)",
      flexShrink: 0
    },
    studentInfo: {
      flex: 1
    },
    studentName: {
      fontSize: "1.6rem",
      fontWeight: 800,
      marginBottom: "0.6rem",
      color: "white",
      textShadow: "0 2px 6px rgba(0,0,0,0.3)"
    },
    studentMeta: {
      display: "flex",
      gap: "1.75rem",
      flexWrap: "wrap",
      marginBottom: "1.25rem"
    },
    metaItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      fontSize: "0.95rem",
      color: "rgba(255, 255, 255, 0.8)",
      fontWeight: 600
    },
    courseInfo: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "1.75rem",
      borderRadius: "18px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      marginBottom: "1.75rem"
    },
    courseTitle: {
      fontSize: "1.3rem",
      fontWeight: 800,
      marginBottom: "0.9rem",
      color: "white"
    },
    courseMeta: {
      display: "flex",
      gap: "1.75rem",
      flexWrap: "wrap"
    },
    motivationSection: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "1.75rem",
      borderRadius: "18px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      marginBottom: "2.25rem"
    },
    motivationTitle: {
      fontSize: "1.15rem",
      fontWeight: 700,
      marginBottom: "0.9rem",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "0.9rem"
    },
    motivationText: {
      fontSize: "0.95rem",
      color: "rgba(255, 255, 255, 0.8)",
      lineHeight: 1.65,
      fontStyle: "italic"
    },
    appActions: {
      display: "flex",
      gap: "1.25rem",
      justifyContent: "space-between",
      alignItems: "center"
    },
    statusBadge: {
      padding: "0.9rem 1.75rem",
      borderRadius: "28px",
      fontSize: "0.95rem",
      fontWeight: 800,
      textTransform: "uppercase",
      letterSpacing: "0.8px",
      border: "1px solid",
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
    },
    actionButtons: {
      display: "flex",
      gap: "0.9rem"
    },
    actionButton: {
      padding: "1.1rem 2rem",
      borderRadius: "14px",
      fontSize: "1rem",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "0.65rem",
      boxShadow: "0 6px 20px rgba(0,0,0,0.2)"
    },
    emptyState: {
      textAlign: "center",
      padding: "5rem 2.5rem",
      background: "rgba(255, 255, 255, 0.07)",
      borderRadius: "22px",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      gridColumn: "1 / -1"
    },
    emptyIcon: {
      fontSize: "4.5rem",
      marginBottom: "1.75rem",
      opacity: 0.6,
      filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))"
    },
    emptyTitle: {
      fontSize: "2rem",
      fontWeight: 800,
      marginBottom: "1.25rem",
      color: "white",
      textShadow: "0 2px 6px rgba(0,0,0,0.3)"
    },
    emptyText: {
      fontSize: "1.15rem",
      color: "rgba(255, 255, 255, 0.8)",
      fontWeight: 500,
      lineHeight: 1.6
    },
    helpSection: {
      background: "rgba(255, 255, 255, 0.07)",
      backdropFilter: "blur(22px)",
      borderRadius: "22px",
      padding: "2.75rem",
      border: "1px solid rgba(255, 255, 255, 0.12)"
    },
    helpTitle: {
      fontSize: "1.4rem",
      fontWeight: 800,
      marginBottom: "1.75rem",
      display: "flex",
      alignItems: "center",
      gap: "1.25rem"
    },
    helpGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "1.75rem"
    },
    helpItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1.25rem",
      padding: "1.25rem",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "14px",
      border: "1px solid rgba(255, 255, 255, 0.08)"
    },
    helpIcon: {
      fontSize: "1.8rem",
      flexShrink: 0
    },
    helpContent: {
      flex: 1
    },
    helpStatus: {
      fontSize: "1.1rem",
      fontWeight: 800,
      marginBottom: "0.4rem",
      color: "white"
    },
    helpDesc: {
      fontSize: "0.95rem",
      color: "rgba(255, 255, 255, 0.8)",
      lineHeight: 1.55
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
          <header style={styles.header}>
            <div style={styles.headerIcon}>📝</div>
            <h1 style={styles.title}>Application Dashboard</h1>
            <p style={styles.subtitle}>
              Comprehensive management portal for reviewing and processing student applications with intelligent filtering
            </p>
          </header>

          {/* Statistics Overview */}
          {myApplications.length > 0 && (
            <div style={styles.statsGrid}>
              {[
                { 
                  key: "pending", 
                  icon: "⏳", 
                  color: "#f59e0b",
                  label: "AWAITING REVIEW"
                },
                { 
                  key: "admitted", 
                  icon: "🎓", 
                  color: "#10b981",
                  label: "ADMITTED"
                },
                { 
                  key: "rejected", 
                  icon: "❌", 
                  color: "#ef4444",
                  label: "REJECTED"
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
                    background: `linear-gradient(135deg, ${stat.color}18, ${stat.color}08)`,
                    borderColor: `${stat.color}35`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px) scale(1.03)";
                    e.currentTarget.style.background = `linear-gradient(135deg, ${stat.color}22, ${stat.color}12)`;
                    e.currentTarget.style.boxShadow = `0 18px 35px ${stat.color}25`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.background = `linear-gradient(135deg, ${stat.color}18, ${stat.color}08)`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={styles.statIcon}>{stat.icon}</div>
                  <div style={{...styles.statValue, color: stat.color}}>
                    {stats[stat.key]}
                  </div>
                  <div style={styles.statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Controls Section */}
          <div style={styles.controlsSection}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="🔍 Search applications by student, course, or motivation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.searchInput,
                  borderColor: searchTerm ? "#4facfe" : "rgba(255, 255, 255, 0.18)",
                  background: searchTerm ? "rgba(255, 255, 255, 0.11)" : "rgba(255, 255, 255, 0.09)"
                }}
              />
            </div>
            
            <div style={styles.filterTabs}>
              {filters.map((filterItem) => (
                <button
                  key={filterItem.key}
                  style={{
                    ...styles.filterTab,
                    background: filter === filterItem.key 
                      ? `linear-gradient(135deg, ${filterItem.color}25, ${filterItem.color}12)`
                      : "rgba(255, 255, 255, 0.07)",
                    borderColor: filter === filterItem.key ? filterItem.color : "rgba(255, 255, 255, 0.12)",
                    color: filter === filterItem.key ? "white" : "rgba(255, 255, 255, 0.7)",
                    transform: filter === filterItem.key ? "scale(1.06)" : "scale(1)",
                    boxShadow: filter === filterItem.key ? `0 6px 18px ${filterItem.color}25` : "none"
                  }}
                  onClick={() => setFilter(filterItem.key)}
                >
                  <span>{filterItem.icon}</span>
                  {filterItem.label}
                </button>
              ))}
            </div>
          </div>

          {/* Applications Grid */}
          <div style={styles.applicationsGrid}>
            {filteredApplications.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  {searchTerm || filter !== "all" ? "🔍" : "📭"}
                </div>
                <h3 style={styles.emptyTitle}>
                  {searchTerm || filter !== "all" 
                    ? "No Matching Applications" 
                    : "No Applications Received"}
                </h3>
                <p style={styles.emptyText}>
                  {searchTerm || filter !== "all"
                    ? "Try adjusting your search criteria or browse all applications"
                    : "Student applications will appear here once they apply to your institution's programs"}
                </p>
              </div>
            ) : (
              filteredApplications.map((app, index) => {
                const statusConfig = getStatusConfig(app.status);

                return (
                  <div
                    key={app.id}
                    style={{
                      ...styles.applicationCard,
                      background: `linear-gradient(135deg, ${statusConfig.color}12, ${statusConfig.color}06)`,
                      borderColor: `${statusConfig.color}35`,
                      transform: activeCard === index ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
                      boxShadow: activeCard === index ? `0 20px 40px ${statusConfig.color}18` : "none"
                    }}
                    onMouseEnter={() => setActiveCard(index)}
                    onMouseLeave={() => setActiveCard(null)}
                  >
                    <div style={styles.appHeader}>
                      <div style={styles.studentAvatar}>
                        {app.studentName?.charAt(0).toUpperCase() || 'S'}
                      </div>
                      
                      <div style={styles.studentInfo}>
                        <h3 style={styles.studentName}>{app.studentName}</h3>
                        <div style={styles.studentMeta}>
                          <div style={styles.metaItem}>
                            <span>🆔</span>
                            Student ID: {app.studentId?.slice(0, 10)}
                          </div>
                          <div style={styles.metaItem}>
                            <span>📅</span>
                            Applied: {new Date(app.appliedDate).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </div>
                        </div>

                        <div style={styles.courseInfo}>
                          <h4 style={styles.courseTitle}>{app.courseTitle}</h4>
                          <div style={styles.courseMeta}>
                            <div style={styles.metaItem}>
                              <span>🏛️</span>
                              {app.facultyName}
                            </div>
                            <div style={styles.metaItem}>
                              <span>📚</span>
                              Course Application
                            </div>
                          </div>
                        </div>

                        {app.applicationText && (
                          <div style={styles.motivationSection}>
                            <h5 style={styles.motivationTitle}>
                              <span>💭</span>
                              Student's Motivation Statement
                            </h5>
                            <p style={styles.motivationText}>
                              "{app.applicationText}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={styles.appActions}>
                      <div style={{
                        ...styles.statusBadge,
                        background: statusConfig.gradient,
                        borderColor: statusConfig.color
                      }}>
                        {statusConfig.icon}
                        {statusConfig.label}
                      </div>

                      <div style={styles.actionButtons}>
                        {app.status === "pending" && (
                          <>
                            <button
                              onClick={() => {
                                if (window.confirm(`🎓 Admit ${app.studentName} to ${app.courseTitle}?\n\nThis will automatically reject other applications from this student.`)) {
                                  handleAdmit(app.id);
                                }
                              }}
                              style={{
                                ...styles.actionButton,
                                background: "linear-gradient(135deg, #10b981, #34d399)",
                                color: "white"
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                                e.currentTarget.style.boxShadow = "0 12px 28px rgba(16, 185, 129, 0.5)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = "translateY(0) scale(1)";
                                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
                              }}
                            >
                              <span>✅</span>
                              Admit Student
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`❌ Reject ${app.studentName}'s application for ${app.courseTitle}?`)) {
                                  handleReject(app.id);
                                }
                              }}
                              style={{
                                ...styles.actionButton,
                                background: "linear-gradient(135deg, #ef4444, #f87171)",
                                color: "white"
                              }}
                              onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px) scale(1.05)";
                                e.currentTarget.style.boxShadow = "0 12px 28px rgba(239, 68, 68, 0.5)";
                              }}
                              onMouseOut={(e) => {
                                e.currentTarget.style.transform = "translateY(0) scale(1)";
                                e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.2)";
                              }}
                            >
                              <span>❌</span>
                              Reject
                            </button>
                          </>
                        )}
                        
                        {app.status !== "pending" && (
                          <div style={{
                            ...styles.actionButton,
                            background: "rgba(255, 255, 255, 0.1)",
                            color: statusConfig.color,
                            border: `2px solid ${statusConfig.color}`,
                            cursor: "default"
                          }}>
                            {statusConfig.icon}
                            Application {app.status}
                          </div>
                        )}
                      </div>
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
                width: "55px",
                height: "55px",
                background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                boxShadow: "0 6px 18px rgba(79, 172, 254, 0.4)"
              }}>💡</span>
              Application Review Guidelines
            </h3>
            <div style={styles.helpGrid}>
              {[
                { 
                  icon: "⏳", 
                  status: "Pending Applications", 
                  desc: "Require your review and decision. Read motivation statements carefully before making decisions." 
                },
                { 
                  icon: "✅", 
                  status: "Admitting Students", 
                  desc: "Admitting a student automatically rejects their other applications to prevent scheduling conflicts." 
                },
                { 
                  icon: "❌", 
                  status: "Rejection Process", 
                  desc: "Rejected applications are archived but can be reviewed again if needed. Provide clear feedback when possible." 
                }
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
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-25px) rotate(90deg) scale(1.08); }
          66% { transform: translateY(12px) rotate(180deg) scale(0.95); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1) rotate(0deg); }
          40% { transform: translateY(-12px) scale(1.08) rotate(8deg); }
          60% { transform: translateY(-6px) scale(1.04) rotate(-4deg); }
        }
      `}</style>
    </>
  );
}