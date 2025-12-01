import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function ViewApplicants() {
  const { applications, courses } = useAppData();
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    admitted: 0,
    pending: 0,
    rejected: 0
  });

  // For prototype: show all applicants who applied (simplified)
  const applicantList = applications;

  const filteredApplicants = applicantList.filter(applicant => {
    const matchesFilter = filter === "all" || applicant.status === filter;
    const matchesSearch = applicant.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         applicant.applicationText?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && (searchTerm === "" || matchesSearch);
  });

  useEffect(() => {
    setStats({
      total: applicantList.length,
      admitted: applicantList.filter(a => a.status === "admitted").length,
      pending: applicantList.filter(a => a.status === "pending").length,
      rejected: applicantList.filter(a => a.status === "rejected").length
    });
  }, [applicantList]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "admitted":
        return { 
          color: "#10b981", 
          bgColor: "rgba(16, 185, 129, 0.1)", 
          icon: "🎓", 
          label: "Graduated",
          gradient: "linear-gradient(135deg, #10b981, #34d399)"
        };
      case "rejected":
        return { 
          color: "#ef4444", 
          bgColor: "rgba(239, 68, 68, 0.1)", 
          icon: "📚", 
          label: "Active Learner",
          gradient: "linear-gradient(135deg, #ef4444, #f87171)"
        };
      default:
        return { 
          color: "#f59e0b", 
          bgColor: "rgba(245, 158, 11, 0.1)", 
          icon: "⏳", 
          label: "Current Student",
          gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)"
        };
    }
  };

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
    controlsSection: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderRadius: "25px",
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
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
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
      letterSpacing: "0.5px"
    },
    applicantsGrid: {
      display: "grid",
      gap: "1.5rem",
      marginBottom: "3rem"
    },
    applicantCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderRadius: "20px",
      padding: "2.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    applicantHeader: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1.5rem",
      marginBottom: "2rem"
    },
    applicantAvatar: {
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      boxShadow: "0 8px 20px rgba(79, 172, 254, 0.3)",
      flexShrink: 0
    },
    applicantInfo: {
      flex: 1
    },
    applicantName: {
      fontSize: "1.5rem",
      fontWeight: 800,
      marginBottom: "0.5rem",
      color: "white",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    applicantMeta: {
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
      fontWeight: 600
    },
    educationInfo: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "1.5rem",
      borderRadius: "15px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      marginBottom: "1.5rem"
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
    motivationSection: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "1.5rem",
      borderRadius: "15px",
      border: "1px solid rgba(255, 255, 255, 0.08)",
      marginBottom: "2rem"
    },
    motivationTitle: {
      fontSize: "1.1rem",
      fontWeight: 700,
      marginBottom: "1rem",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
    },
    motivationText: {
      fontSize: "0.95rem",
      color: "rgba(255, 255, 255, 0.8)",
      lineHeight: 1.6,
      fontStyle: "italic"
    },
    applicantActions: {
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
      gap: "0.5rem",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
    },
    actionButtons: {
      display: "flex",
      gap: "0.75rem"
    },
    actionButton: {
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
      background: "rgba(255, 255, 255, 0.08)",
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
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderRadius: "25px",
      padding: "2.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    helpTitle: {
      fontSize: "1.5rem",
      fontWeight: 800,
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
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.08)"
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

  const filters = [
    { key: "all", label: "All Applicants", icon: "👥", color: "#4facfe" },
    { key: "admitted", label: "Graduated", icon: "🎓", color: "#10b981" },
    { key: "pending", label: "Current Students", icon: "⏳", color: "#f59e0b" },
    { key: "rejected", label: "Active Learners", icon: "📚", color: "#a78bfa" }
  ];

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
            <h1 style={styles.headerTitle}>Talent Discovery Hub</h1>
            <p style={styles.headerSubtitle}>
              Discover exceptional candidates from our academic network. Filter by graduation status, 
              review qualifications, and connect with the next generation of professionals.
            </p>
          </header>

          {/* Stats Overview */}
          {applicantList.length > 0 && (
            <div style={styles.statsGrid}>
              {[
                { 
                  key: "total", 
                  icon: "👥", 
                  color: "#4facfe",
                  label: "TOTAL APPLICANTS"
                },
                { 
                  key: "admitted", 
                  icon: "🎓", 
                  color: "#10b981",
                  label: "GRADUATED"
                },
                { 
                  key: "pending", 
                  icon: "⏳", 
                  color: "#f59e0b",
                  label: "CURRENT STUDENTS"
                },
                { 
                  key: "rejected", 
                  icon: "📚", 
                  color: "#a78bfa",
                  label: "ACTIVE LEARNERS"
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
                placeholder="🔍 Search by name, course, or motivation..."
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

          {/* Applicants Grid */}
          <div style={styles.applicantsGrid}>
            {filteredApplicants.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  {searchTerm || filter !== "all" ? "🔍" : "👥"}
                </div>
                <h3 style={styles.emptyTitle}>
                  {searchTerm || filter !== "all" 
                    ? "No Matching Candidates" 
                    : "No Applicants Yet"}
                </h3>
                <p style={styles.emptyText}>
                  {searchTerm || filter !== "all"
                    ? "Try adjusting your search criteria or browse all candidates"
                    : "Qualified candidates will appear here as they apply through our academic network"}
                </p>
              </div>
            ) : (
              filteredApplicants.map((applicant, index) => {
                const statusConfig = getStatusConfig(applicant.status);
                const course = courses.find(c => c.id === applicant.courseId);

                return (
                  <div
                    key={applicant.id}
                    style={{
                      ...styles.applicantCard,
                      background: `linear-gradient(135deg, ${statusConfig.color}10, ${statusConfig.color}05)`,
                      borderColor: `${statusConfig.color}30`,
                      transform: selectedApplicant === index ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)"
                    }}
                    onMouseEnter={() => setSelectedApplicant(index)}
                    onMouseLeave={() => setSelectedApplicant(null)}
                  >
                    <div style={styles.applicantHeader}>
                      <div style={styles.applicantAvatar}>
                        {applicant.studentName?.charAt(0).toUpperCase() || 'A'}
                      </div>
                      
                      <div style={styles.applicantInfo}>
                        <h3 style={styles.applicantName}>{applicant.studentName}</h3>
                        <div style={styles.applicantMeta}>
                          <div style={styles.metaItem}>
                            <span>🆔</span>
                            Student ID: {applicant.studentId?.slice(0, 10)}
                          </div>
                          <div style={styles.metaItem}>
                            <span>📅</span>
                            Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
                          </div>
                        </div>

                        <div style={styles.educationInfo}>
                          <h4 style={styles.courseTitle}>{course?.title || applicant.courseTitle}</h4>
                          <div style={styles.courseMeta}>
                            <div style={styles.metaItem}>
                              <span>🏛️</span>
                              {applicant.facultyName}
                            </div>
                            <div style={styles.metaItem}>
                              <span>🏫</span>
                              {applicant.institutionName}
                            </div>
                          </div>
                        </div>

                        {applicant.applicationText && (
                          <div style={styles.motivationSection}>
                            <h5 style={styles.motivationTitle}>
                              <span>💭</span>
                              Candidate Motivation
                            </h5>
                            <p style={styles.motivationText}>
                              "{applicant.applicationText}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={styles.applicantActions}>
                      <div style={{
                        ...styles.statusBadge,
                        background: statusConfig.gradient,
                        borderColor: statusConfig.color
                      }}>
                        {statusConfig.icon}
                        {statusConfig.label}
                      </div>

                      <div style={styles.actionButtons}>
                        <button
                          onClick={() => alert(`📧 Contact ${applicant.studentName} at their institution email`)}
                          style={{
                            ...styles.actionButton,
                            background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                            color: "white"
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "translateY(-2px)";
                            e.currentTarget.style.boxShadow = "0 8px 20px rgba(79, 172, 254, 0.4)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "none";
                          }}
                        >
                          <span>📧</span>
                          Contact
                        </button>
                        
                        <button
                          onClick={() => alert(`👀 View ${applicant.studentName}'s complete academic profile and transcripts`)}
                          style={{
                            ...styles.actionButton,
                            background: "rgba(255, 255, 255, 0.1)",
                            color: "white",
                            border: "1px solid rgba(255, 255, 255, 0.2)"
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
                            e.currentTarget.style.transform = "translateY(-2px)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <span>👀</span>
                          View Profile
                        </button>
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
                width: "50px",
                height: "50px",
                background: "linear-gradient(135deg, #a78bfa, #c4b5fd)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem"
              }}>💡</span>
              Strategic Hiring Guide
            </h3>
            <div style={styles.helpGrid}>
              {[
                { 
                  icon: "🎓", 
                  status: "Graduated Candidates", 
                  desc: "Ready for immediate full-time roles with complete academic credentials" 
                },
                { 
                  icon: "⏳", 
                  status: "Current Students", 
                  desc: "Ideal for internships, part-time roles, and future graduate programs" 
                },
                { 
                  icon: "📚", 
                  status: "Active Learners", 
                  desc: "Great for specialized training programs and skill-based roles" 
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
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
      `}</style>
    </>
  );
}