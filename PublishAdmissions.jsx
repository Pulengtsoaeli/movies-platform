import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function PublishAdmissions() {
  const { applications, admitApplication } = useAppData();
  const [activeTab, setActiveTab] = useState("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const pendingApplications = applications?.filter(app => app.status === "pending" || !app.status) || [];
  const admittedApplications = applications?.filter(app => app.status === "admitted") || [];
  const totalApplications = applications?.length || 0;

  const filteredApplications = applications?.filter(app => {
    const matchesSearch = app.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.studentEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.courseName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.institutionName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
                      (activeTab === "pending" && (app.status === "pending" || !app.status)) ||
                      (activeTab === "admitted" && app.status === "admitted");
    
    return matchesSearch && matchesTab;
  }) || [];

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

  const handleAdmit = async (applicationId, studentName, courseName) => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    admitApplication(applicationId);
    setIsProcessing(false);
  };

  const handleBulkAdmit = async () => {
    if (pendingApplications.length === 0) {
      alert("🎯 No pending applications to admit.");
      return;
    }
    
    setIsProcessing(true);
    // Simulate bulk API calls
    for (const app of pendingApplications) {
      await new Promise(resolve => setTimeout(resolve, 200));
      admitApplication(app.id);
    }
    setIsProcessing(false);
  };

  const stats = [
    { label: "Total Applications", value: totalApplications, icon: "📝", color: "#4facfe" },
    { label: "Pending Review", value: pendingApplications.length, icon: "⏳", color: "#f59e0b" },
    { label: "Admitted Students", value: admittedApplications.length, icon: "🎓", color: "#10b981" },
    { label: "Admission Rate", value: totalApplications > 0 ? Math.round((admittedApplications.length / totalApplications) * 100) : 0, icon: "📊", color: "#8b5cf6", suffix: "%" }
  ];

  const tabs = [
    { key: "all", label: "All Applications", icon: "📋", count: totalApplications },
    { key: "pending", label: "Pending Review", icon: "⏳", count: pendingApplications.length },
    { key: "admitted", label: "Admitted", icon: "🎓", count: admittedApplications.length }
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
      marginBottom: "2rem",
      textAlign: "center"
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
      margin: "0 auto 1.5rem",
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
      maxWidth: "600px",
      margin: "0 auto"
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem"
    },
    statItem: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease",
      textAlign: "center"
    },
    statIcon: {
      fontSize: "2.5rem",
      marginBottom: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    statValue: {
      fontSize: "2.5rem",
      fontWeight: 800,
      marginBottom: "0.5rem"
    },
    statLabel: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "rgba(255, 255, 255, 0.8)"
    },
    applicationsCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "2.5rem",
      marginBottom: "2rem"
    },
    applicationsHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "2rem",
      flexWrap: "wrap",
      gap: "1rem"
    },
    applicationsTitle: {
      fontSize: "1.8rem",
      fontWeight: 800,
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    searchBox: {
      padding: "1rem 1.5rem",
      borderRadius: "15px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      fontSize: "1rem",
      background: "rgba(255, 255, 255, 0.08)",
      color: "white",
      backdropFilter: "blur(10px)",
      minWidth: "300px",
      transition: "all 0.3s ease"
    },
    tabContainer: {
      display: "flex",
      gap: "0.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      padding: "0.5rem",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginBottom: "2rem",
      flexWrap: "wrap"
    },
    tab: {
      padding: "0.75rem 1.5rem",
      borderRadius: "8px",
      border: "none",
      background: "transparent",
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
      gap: "1rem"
    },
    applicationCard: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "2rem",
      borderRadius: "18px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      backdropFilter: "blur(10px)"
    },
    applicationHeader: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: "1rem"
    },
    applicationInfo: {
      flex: 1
    },
    studentName: {
      fontSize: "1.3rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "0.5rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    applicationMeta: {
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
    statusBadge: {
      padding: "0.75rem 1.25rem",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      border: "1px solid",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
    },
    actionButtons: {
      display: "flex",
      gap: "0.75rem",
      flexWrap: "wrap"
    },
    actionButton: {
      padding: "0.75rem 1.25rem",
      borderRadius: "10px",
      fontSize: "0.8rem",
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
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    emptyIcon: {
      fontSize: "4rem",
      marginBottom: "1.5rem",
      opacity: 0.5
    },
    emptyTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "1rem",
      color: "white"
    },
    emptyText: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500,
      lineHeight: 1.6
    },
    quickActions: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "2.5rem",
      textAlign: "center"
    },
    quickActionsTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "white",
      marginBottom: "1.5rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    quickActionsGrid: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      flexWrap: "wrap"
    },
    quickActionButton: {
      padding: "1rem 2rem",
      borderRadius: "15px",
      fontSize: "1rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
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
            <div style={styles.headerIcon}>🎓</div>
            <h1 style={styles.headerTitle}>Admissions Center</h1>
            <p style={styles.headerSubtitle}>
              Comprehensive review and management of student applications with advanced admission processing
            </p>
          </div>

          {/* Statistics Overview */}
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  ...styles.statItem,
                  background: `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`,
                  border: `1px solid ${stat.color}30`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)`;
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `linear-gradient(135deg, ${stat.color}15, ${stat.color}05)`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={styles.statIcon}>{stat.icon}</div>
                <div style={{...styles.statValue, color: stat.color}}>
                  {stat.value}{stat.suffix || ""}
                </div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Applications Management Card */}
          <div style={styles.applicationsCard}>
            <div style={styles.applicationsHeader}>
              <h3 style={styles.applicationsTitle}>
                <span>📋</span> Application Review
              </h3>
              <input
                type="text"
                placeholder="🔍 Search by student, course, or institution..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.searchBox,
                  borderColor: searchTerm ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                  background: searchTerm ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: searchTerm ? '0 0 20px rgba(79, 172, 254, 0.3)' : 'none'
                }}
              />
            </div>

            {/* Tabs */}
            <div style={styles.tabContainer}>
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  style={{
                    ...styles.tab,
                    background: activeTab === tab.key ? 'rgba(79, 172, 254, 0.2)' : 'transparent',
                    color: activeTab === tab.key ? 'white' : 'rgba(255, 255, 255, 0.7)',
                    border: activeTab === tab.key ? '1px solid rgba(79, 172, 254, 0.3)' : '1px solid transparent'
                  }}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                  <span style={{
                    background: activeTab === tab.key ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    marginLeft: '4px'
                  }}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Applications List */}
            {(!applications || filteredApplications.length === 0) ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  {searchTerm ? "🔍" : 
                   activeTab === "all" ? "📝" : 
                   activeTab === "pending" ? "⏳" : "🎓"}
                </div>
                <h3 style={styles.emptyTitle}>
                  {searchTerm 
                    ? "No Applications Found" 
                    : activeTab === "all" ? "No Applications Received" : 
                      activeTab === "pending" ? "No Pending Applications" : "No Admitted Students"}
                </h3>
                <p style={styles.emptyText}>
                  {searchTerm 
                    ? "Try adjusting your search terms to find what you're looking for."
                    : activeTab === "all" 
                      ? "Student applications will appear here once they apply to your programs."
                      : `No applications found with ${activeTab} status.`}
                </p>
              </div>
            ) : (
              <div style={styles.applicationsGrid}>
                {filteredApplications.map((app) => {
                  const statusConfig = getStatusConfig(app.status);
                  
                  return (
                    <div
                      key={app.id}
                      style={styles.applicationCard}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      <div style={styles.applicationHeader}>
                        <div style={styles.applicationInfo}>
                          <h4 style={styles.studentName}>{app.studentName || "Unknown Student"}</h4>
                          <div style={styles.applicationMeta}>
                            <div style={styles.metaItem}>
                              <span>📧</span>
                              {app.studentEmail || "No email provided"}
                            </div>
                            <div style={styles.metaItem}>
                              <span>📚</span>
                              {app.courseName || "No course specified"}
                            </div>
                            <div style={styles.metaItem}>
                              <span>🏫</span>
                              {app.institutionName || "No institution specified"}
                            </div>
                            <div style={styles.metaItem}>
                              <span>📅</span>
                              Applied {app.createdAt ? new Date(app.createdAt).toLocaleDateString() : "Unknown"}
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

                      <div style={styles.actionButtons}>
                        {app.status !== "admitted" && (
                          <button
                            onClick={() => handleAdmit(app.id, app.studentName, app.courseName)}
                            disabled={isProcessing}
                            style={{
                              ...styles.actionButton,
                              background: isProcessing ? 
                                "linear-gradient(135deg, #6b7280, #9ca3af)" :
                                "linear-gradient(135deg, #10b981, #34d399)",
                              color: "white",
                              cursor: isProcessing ? "not-allowed" : "pointer"
                            }}
                            onMouseOver={(e) => !isProcessing && (e.currentTarget.style.transform = "scale(1.05)")}
                            onMouseOut={(e) => !isProcessing && (e.currentTarget.style.transform = "scale(1)")}
                          >
                            {isProcessing ? (
                              <>
                                <span className="loading-spinner"></span>
                                Processing...
                              </>
                            ) : (
                              <>
                                🎓 Admit Student
                              </>
                            )}
                          </button>
                        )}
                        {app.status === "admitted" && (
                          <div style={{
                            ...styles.actionButton,
                            background: "linear-gradient(135deg, #10b981, #34d399)",
                            color: "white",
                            cursor: "default"
                          }}>
                            🎉 Successfully Admitted
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div style={styles.quickActions}>
            <h4 style={styles.quickActionsTitle}>🚀 Admission Operations</h4>
            <div style={styles.quickActionsGrid}>
              <button
                onClick={handleBulkAdmit}
                disabled={pendingApplications.length === 0 || isProcessing}
                style={{
                  ...styles.quickActionButton,
                  background: (pendingApplications.length > 0 && !isProcessing) ? 
                    "linear-gradient(135deg, #10b981, #34d399)" : 
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                  color: "white",
                  cursor: (pendingApplications.length > 0 && !isProcessing) ? "pointer" : "not-allowed",
                  boxShadow: (pendingApplications.length > 0 && !isProcessing) ? "0 4px 20px rgba(16, 185, 129, 0.4)" : "none",
                  opacity: isProcessing ? 0.7 : 1
                }}
                onMouseOver={(e) => (pendingApplications.length > 0 && !isProcessing) && (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseOut={(e) => (pendingApplications.length > 0 && !isProcessing) && (e.currentTarget.style.transform = "translateY(0)")}
              >
                {isProcessing ? (
                  <>
                    <span className="loading-spinner"></span>
                    Processing Bulk Admission...
                  </>
                ) : (
                  <>
                    <span>✅</span>
                    Admit All Pending ({pendingApplications.length})
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  if (applications.length === 0) {
                    alert("📊 No applications data to export.");
                    return;
                  }
                  alert(`📊 Exporting ${applications.length} applications data...`);
                  // Export functionality would go here
                }}
                style={{
                  ...styles.quickActionButton,
                  background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(79, 172, 254, 0.4)"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <span>📊</span>
                Export Applications
              </button>
              <button
                onClick={() => {
                  const admittedCount = admittedApplications.length;
                  if (admittedCount === 0) {
                    alert("📢 No admitted students to notify.");
                    return;
                  }
                  alert(`📢 Sending admission notifications to ${admittedCount} students...`);
                  // Notification functionality would go here
                }}
                style={{
                  ...styles.quickActionButton,
                  background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <span>📢</span>
                Notify Admitted ({admittedApplications.length})
              </button>
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
        
        .loading-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}