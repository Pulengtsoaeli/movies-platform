import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function ManageStudentStatus() {
  const { applications, updateApplication, courses, faculties, institutions } = useAppData();
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
  const myApplications = applications.filter(app => 
    app.institutionId === user.id.toString()
  );

  const filteredApplications = myApplications.filter(app => {
    const matchesFilter = filter === "all" || app.status === filter;
    const matchesSearch = app.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && (searchTerm === "" || matchesSearch);
  });

  useEffect(() => {
    // Calculate stats
    setStats({
      pending: myApplications.filter(a => a.status === "pending").length,
      admitted: myApplications.filter(a => a.status === "admitted").length,
      rejected: myApplications.filter(a => a.status === "rejected").length,
      total: myApplications.length
    });
  }, [myApplications]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "admitted":
        return { 
          color: "#10b981", 
          bgColor: "rgba(16, 185, 129, 0.1)", 
          icon: "🎉", 
          label: "Admitted",
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

  const handleStatusUpdate = async (appId, newStatus) => {
    await updateApplication(appId, { status: newStatus });
  };

  const filters = [
    { key: "all", label: "All Applications", icon: "📊", color: "#4facfe" },
    { key: "pending", label: "Under Review", icon: "⏳", color: "#f59e0b" },
    { key: "admitted", label: "Accepted", icon: "🎉", color: "#10b981" },
    { key: "rejected", label: "Not Accepted", icon: "📝", color: "#ef4444" }
  ];

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
      maxWidth: "500px",
      margin: "0 auto",
      lineHeight: 1.6
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem"
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
    controlsSection: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginBottom: "2rem"
    },
    searchContainer: {
      display: "flex",
      gap: "1rem",
      marginBottom: "1.5rem"
    },
    searchInput: {
      flex: 1,
      padding: "1rem 1.5rem",
      background: "rgba(255, 255, 255, 0.08)",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      color: "white",
      fontSize: "1rem",
      fontWeight: 500,
      transition: "all 0.3s ease"
    },
    filterTabs: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap"
    },
    filterTab: {
      padding: "1rem 1.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
    },
    applicationsGrid: {
      display: "grid",
      gap: "1.5rem",
      marginBottom: "3rem"
    },
    applicationCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    appHeader: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1.5rem",
      marginBottom: "2rem"
    },
    studentAvatar: {
      width: "70px",
      height: "70px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      boxShadow: "0 8px 20px rgba(79, 172, 254, 0.3)",
      flexShrink: 0
    },
    studentInfo: {
      flex: 1
    },
    studentName: {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
      color: "white"
    },
    studentMeta: {
      display: "flex",
      gap: "1.5rem",
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
    courseInfo: {
      background: "rgba(255, 255, 255, 0.03)",
      padding: "1.5rem",
      borderRadius: "15px",
      border: "1px solid rgba(255, 255, 255, 0.05)",
      marginBottom: "2rem"
    },
    courseTitle: {
      fontSize: "1.2rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
      color: "white"
    },
    courseMeta: {
      display: "flex",
      gap: "1.5rem",
      flexWrap: "wrap"
    },
    appActions: {
      display: "flex",
      gap: "1rem",
      justifyContent: "space-between",
      alignItems: "center"
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
    actionButtons: {
      display: "flex",
      gap: "0.75rem"
    },
    statusButton: {
      padding: "0.75rem 1.5rem",
      borderRadius: "12px",
      fontSize: "0.9rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    emptyState: {
      textAlign: "center",
      padding: "4rem 2rem",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      gridColumn: "1 / -1"
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
      lineHeight: 1.6
    },
    helpSection: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    helpTitle: {
      fontSize: "1.3rem",
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
      gap: "1rem",
      padding: "1rem",
      background: "rgba(255, 255, 255, 0.03)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.05)"
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
          <div style={{...styles.floatingShape, ...styles.shape1}}></div>
          <div style={{...styles.floatingShape, ...styles.shape2}}></div>
          <div style={{...styles.floatingShape, ...styles.shape3}}></div>
          <div style={styles.gridPattern}></div>
        </div>

        <div style={styles.content}>
          {/* Header Section */}
          <header style={styles.header}>
            <div style={styles.headerIcon}>👥</div>
            <h1 style={styles.title}>Admissions Center</h1>
            <p style={styles.subtitle}>
              Review and manage student applications with comprehensive status tracking and decision tools
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
                placeholder="🔍 Search students or courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.searchInput,
                  borderColor: searchTerm ? "#4facfe" : "rgba(255, 255, 255, 0.1)"
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
                      ? `linear-gradient(135deg, ${filterItem.color}20, ${filterItem.color}10)`
                      : "rgba(255, 255, 255, 0.05)",
                    borderColor: filter === filterItem.key ? filterItem.color : "rgba(255, 255, 255, 0.1)",
                    color: filter === filterItem.key ? "white" : "rgba(255, 255, 255, 0.7)",
                    transform: filter === filterItem.key ? "scale(1.05)" : "scale(1)"
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
                    : "No Applications Yet"}
                </h3>
                <p style={styles.emptyText}>
                  {searchTerm || filter !== "all"
                    ? "Try adjusting your search criteria or browse all applications"
                    : "Student applications will appear here once they apply to your institution's courses"}
                </p>
              </div>
            ) : (
              filteredApplications.map((app, index) => {
                const statusConfig = getStatusConfig(app.status);
                const course = courses.find(c => c.id === app.courseId);
                const faculty = faculties.find(f => f.id === app.facultyId);

                return (
                  <div
                    key={app.id}
                    style={{
                      ...styles.applicationCard,
                      background: `linear-gradient(135deg, ${statusConfig.color}10, ${statusConfig.color}05)`,
                      borderColor: `${statusConfig.color}30`,
                      transform: activeCard === index ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)"
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
                            Student ID: {app.studentId?.slice(0, 8)}
                          </div>
                          <div style={styles.metaItem}>
                            <span>📅</span>
                            Applied: {new Date(app.appliedDate).toLocaleDateString()}
                          </div>
                        </div>

                        <div style={styles.courseInfo}>
                          <h4 style={styles.courseTitle}>{course?.title || app.courseTitle}</h4>
                          <div style={styles.courseMeta}>
                            <div style={styles.metaItem}>
                              <span>🏛️</span>
                              {faculty?.name || app.facultyName}
                            </div>
                            <div style={styles.metaItem}>
                              <span>📚</span>
                              Course ID: {app.courseId?.slice(0, 8)}
                            </div>
                          </div>
                        </div>
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
                        {[
                          { status: "admitted", icon: "🎉", color: "#10b981", label: "Accept" },
                          { status: "rejected", icon: "📝", color: "#ef4444", label: "Decline" },
                          { status: "pending", icon: "⏳", color: "#f59e0b", label: "Review" }
                        ].map((action) => (
                          <button
                            key={action.status}
                            onClick={() => handleStatusUpdate(app.id, action.status)}
                            style={{
                              ...styles.statusButton,
                              background: app.status === action.status 
                                ? action.color 
                                : `rgba(${parseInt(action.color.slice(1, 3), 16)}, ${parseInt(action.color.slice(3, 5), 16)}, ${parseInt(action.color.slice(5, 7), 16)}, 0.2)`,
                              color: app.status === action.status ? "white" : action.color,
                              border: app.status === action.status ? "none" : `1px solid ${action.color}30`
                            }}
                            onMouseOver={(e) => {
                              if (app.status !== action.status) {
                                e.currentTarget.style.background = action.color;
                                e.currentTarget.style.color = "white";
                                e.currentTarget.style.transform = "scale(1.05)";
                              }
                            }}
                            onMouseOut={(e) => {
                              if (app.status !== action.status) {
                                e.currentTarget.style.background = `rgba(${parseInt(action.color.slice(1, 3), 16)}, ${parseInt(action.color.slice(3, 5), 16)}, ${parseInt(action.color.slice(5, 7), 16)}, 0.2)`;
                                e.currentTarget.style.color = action.color;
                                e.currentTarget.style.transform = "scale(1)";
                              }
                            }}
                          >
                            {action.icon}
                            {action.label}
                          </button>
                        ))}
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
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #a78bfa, #c4b5fd)",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem"
              }}>💡</span>
              Application Status Guide
            </h3>
            <div style={styles.helpGrid}>
              {[
                { icon: "⏳", status: "Under Review", desc: "Application is being evaluated by admissions team" },
                { icon: "🎉", status: "Accepted", desc: "Student has been admitted to the program" },
                { icon: "📝", status: "Not Accepted", desc: "Application was not successful this cycle" }
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