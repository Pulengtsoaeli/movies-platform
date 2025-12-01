import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function Reports() {
  const { institutions, faculties, courses, applications, companies, jobs } = useAppData();
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("all");

  // Calculate additional statistics
  const admittedApplications = applications.filter(app => app.status === "admitted").length;
  const pendingApplications = applications.filter(app => app.status === "pending" || !app.status).length;
  const approvedInstitutions = institutions.filter(inst => inst.status === "approved").length;
  const activeJobs = jobs.filter(job => job.status === "active").length;
  const approvedCompanies = companies.filter(comp => comp.status === "approved").length;

  const stats = [
    {
      title: "Educational Institutions",
      value: institutions.length,
      icon: "🏢",
      color: "#4facfe",
      description: `${approvedInstitutions} approved, ${institutions.length - approvedInstitutions} pending`,
      gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
      change: "+12%",
      trend: "up"
    },
    {
      title: "Academic Faculties",
      value: faculties.length,
      icon: "🏛️",
      color: "#ff6b6b",
      description: "Organized academic departments",
      gradient: "linear-gradient(135deg, #ff6b6b, #ff8e53)",
      change: "+8%",
      trend: "up"
    },
    {
      title: "Courses & Programs",
      value: courses.length,
      icon: "📚",
      color: "#4ade80",
      description: "Available academic courses",
      gradient: "linear-gradient(135deg, #4ade80, #22c55e)",
      change: "+15%",
      trend: "up"
    },
    {
      title: "Student Applications",
      value: applications.length,
      icon: "📝",
      color: "#f59e0b",
      description: `${admittedApplications} admitted, ${pendingApplications} pending`,
      gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)",
      change: "+23%",
      trend: "up"
    },
    {
      title: "Partner Companies",
      value: companies.length,
      icon: "💼",
      color: "#8b5cf6",
      description: `${approvedCompanies} approved partners`,
      gradient: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
      change: "+5%",
      trend: "up"
    },
    {
      title: "Job Opportunities",
      value: jobs.length,
      icon: "🔧",
      color: "#06b6d4",
      description: `${activeJobs} active positions`,
      gradient: "linear-gradient(135deg, #06b6d4, #0ea5e9)",
      change: "+18%",
      trend: "up"
    }
  ];

  // Calculate growth metrics
  const totalEntities = institutions.length + faculties.length + courses.length + applications.length + companies.length + jobs.length;
  const admissionRate = applications.length > 0 ? Math.round((admittedApplications / applications.length) * 100) : 0;
  const approvalRate = institutions.length > 0 ? Math.round((approvedInstitutions / institutions.length) * 100) : 0;

  const tabs = [
    { key: "overview", label: "Overview", icon: "📊" },
    { key: "academic", label: "Academic", icon: "🎓" },
    { key: "career", label: "Career", icon: "💼" },
    { key: "analytics", label: "Analytics", icon: "📈" }
  ];

  const timeRanges = [
    { key: "all", label: "All Time" },
    { key: "month", label: "This Month" },
    { key: "quarter", label: "This Quarter" },
    { key: "year", label: "This Year" }
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
    controls: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem",
      flexWrap: "wrap",
      gap: "1rem"
    },
    tabContainer: {
      display: "flex",
      gap: "0.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      padding: "0.5rem",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.1)"
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
    timeRangeContainer: {
      display: "flex",
      gap: "0.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      padding: "0.5rem",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    timeRange: {
      padding: "0.5rem 1rem",
      borderRadius: "6px",
      border: "none",
      background: "transparent",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem"
    },
    statCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    statHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "1rem"
    },
    statIcon: {
      width: "60px",
      height: "60px",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.8rem",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
    },
    statTitle: {
      fontSize: "1rem",
      fontWeight: 600,
      color: "rgba(255, 255, 255, 0.8)",
      marginBottom: "0.5rem"
    },
    statValue: {
      fontSize: "2.5rem",
      fontWeight: 800,
      marginBottom: "0.25rem"
    },
    statDescription: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.6)",
      fontWeight: 500,
      marginBottom: "1rem"
    },
    trendBadge: {
      padding: "0.25rem 0.75rem",
      borderRadius: "12px",
      fontSize: "0.8rem",
      fontWeight: 700,
      display: "flex",
      alignItems: "center",
      gap: "0.25rem"
    },
    progressBar: {
      height: "6px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "3px",
      overflow: "hidden",
      marginTop: "1rem"
    },
    progressFill: {
      height: "100%",
      borderRadius: "3px",
      transition: "width 0.5s ease"
    },
    insightsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "1.5rem",
      marginBottom: "2rem"
    },
    insightCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s ease"
    },
    insightTitle: {
      fontSize: "1.2rem",
      fontWeight: 700,
      color: "white",
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    insightItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "0.75rem 0",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
    },
    insightLabel: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500
    },
    insightValue: {
      fontSize: "1rem",
      fontWeight: 700
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
            <div style={styles.headerIcon}>📊</div>
            <h1 style={styles.headerTitle}>Analytics Dashboard</h1>
            <p style={styles.headerSubtitle}>
              Comprehensive insights and performance metrics across the entire educational ecosystem
            </p>
          </div>

          {/* Controls */}
          <div style={styles.controls}>
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
                </button>
              ))}
            </div>

            <div style={styles.timeRangeContainer}>
              {timeRanges.map((range) => (
                <button
                  key={range.key}
                  style={{
                    ...styles.timeRange,
                    background: timeRange === range.key ? 'rgba(79, 172, 254, 0.2)' : 'transparent',
                    color: timeRange === range.key ? 'white' : 'rgba(255, 255, 255, 0.7)'
                  }}
                  onClick={() => setTimeRange(range.key)}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics Overview */}
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div
                key={index}
                style={styles.statCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.transform = "translateY(-5px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={styles.statHeader}>
                  <div>
                    <div style={styles.statTitle}>{stat.title}</div>
                    <div style={{...styles.statValue, color: stat.color}}>
                      {stat.value}
                    </div>
                  </div>
                  <div style={{
                    ...styles.statIcon,
                    background: stat.gradient
                  }}>
                    {stat.icon}
                  </div>
                </div>
                
                <div style={styles.statDescription}>
                  {stat.description}
                </div>

                <div style={{
                  ...styles.trendBadge,
                  background: stat.trend === "up" ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)",
                  color: stat.trend === "up" ? "#10b981" : "#ef4444"
                }}>
                  {stat.trend === "up" ? "↗" : "↘"} {stat.change}
                </div>

                <div style={styles.progressBar}>
                  <div style={{
                    ...styles.progressFill,
                    background: stat.gradient,
                    width: `${Math.min((stat.value / Math.max(...stats.map(s => s.value))) * 100, 100)}%`
                  }}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Insights */}
          <div style={styles.insightsGrid}>
            {/* Application Insights */}
            <div 
              style={styles.insightCard}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"}
            >
              <h4 style={styles.insightTitle}>
                <span>🎯</span> Application Analytics
              </h4>
              <div>
                <div style={styles.insightItem}>
                  <span style={styles.insightLabel}>Admission Rate</span>
                  <span style={{...styles.insightValue, color: "#10b981"}}>
                    {admissionRate}%
                  </span>
                </div>
                <div style={styles.insightItem}>
                  <span style={styles.insightLabel}>Pending Review</span>
                  <span style={{...styles.insightValue, color: "#f59e0b"}}>
                    {pendingApplications}
                  </span>
                </div>
                <div style={styles.insightItem}>
                  <span style={styles.insightLabel}>Applications per Institution</span>
                  <span style={{...styles.insightValue, color: "#4facfe"}}>
                    {institutions.length > 0 ? (applications.length / institutions.length).toFixed(1) : 0}
                  </span>
                </div>
                <div style={{...styles.insightItem, borderBottom: "none"}}>
                  <span style={styles.insightLabel}>Conversion Rate</span>
                  <span style={{...styles.insightValue, color: "#8b5cf6"}}>
                    {totalEntities > 0 ? Math.round((admittedApplications / totalEntities) * 100) : 0}%
                  </span>
                </div>
              </div>
            </div>

            {/* Institutional Insights */}
            <div 
              style={styles.insightCard}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"}
            >
              <h4 style={styles.insightTitle}>
                <span>🏫</span> Institutional Metrics
              </h4>
              <div>
                <div style={styles.insightItem}>
                  <span style={styles.insightLabel}>Approval Rate</span>
                  <span style={{...styles.insightValue, color: "#10b981"}}>
                    {approvalRate}%
                  </span>
                </div>
                <div style={styles.insightItem}>
                  <span style={styles.insightLabel}>Faculties per Institution</span>
                  <span style={{...styles.insightValue, color: "#ff6b6b"}}>
                    {institutions.length > 0 ? (faculties.length / institutions.length).toFixed(1) : 0}
                  </span>
                </div>
                <div style={styles.insightItem}>
                  <span style={styles.insightLabel}>Courses per Faculty</span>
                  <span style={{...styles.insightValue, color: "#4ade80"}}>
                    {faculties.length > 0 ? (courses.length / faculties.length).toFixed(1) : 0}
                  </span>
                </div>
                <div style={{...styles.insightItem, borderBottom: "none"}}>
                  <span style={styles.insightLabel}>Platform Growth</span>
                  <span style={{...styles.insightValue, color: "#f59e0b"}}>
                    {totalEntities > 50 ? "High" : totalEntities > 20 ? "Medium" : "Growing"}
                  </span>
                </div>
              </div>
            </div>

            {/* Career Insights */}
            <div 
              style={styles.insightCard}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.12)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)"}
            >
              <h4 style={styles.insightTitle}>
                <span>💼</span> Career Center Analytics
              </h4>
              <div>
                <div style={styles.insightItem}>
                  <span style={styles.insightLabel}>Active Job Posts</span>
                  <span style={{...styles.insightValue, color: "#06b6d4"}}>
                    {activeJobs}
                  </span>
                </div>
                <div style={styles.insightItem}>
                  <span style={styles.insightLabel}>Jobs per Company</span>
                  <span style={{...styles.insightValue, color: "#8b5cf6"}}>
                    {companies.length > 0 ? (jobs.length / companies.length).toFixed(1) : 0}
                  </span>
                </div>
                <div style={styles.insightItem}>
                  <span style={styles.insightLabel}>Partner Engagement</span>
                  <span style={{...styles.insightValue, color: "#10b981"}}>
                    {companies.length > 0 ? Math.round((approvedCompanies / companies.length) * 100) : 0}%
                  </span>
                </div>
                <div style={{...styles.insightItem, borderBottom: "none"}}>
                  <span style={styles.insightLabel}>Market Activity</span>
                  <span style={{...styles.insightValue, color: "#f59e0b"}}>
                    {jobs.length > 10 ? "High" : jobs.length > 5 ? "Moderate" : "Developing"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={styles.quickActions}>
            <h4 style={styles.quickActionsTitle}>🚀 Report Operations</h4>
            <div style={styles.quickActionsGrid}>
              <button
                onClick={() => alert("📄 Exporting comprehensive system analytics report...")}
                style={{
                  ...styles.quickActionButton,
                  background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(79, 172, 254, 0.4)"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <span>📄</span>
                Export Full Analytics
              </button>
              <button
                onClick={() => alert("📊 Generating detailed PDF report with insights...")}
                style={{
                  ...styles.quickActionButton,
                  background: "linear-gradient(135deg, #ff6b6b, #ff8e53)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(255, 107, 107, 0.4)"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <span>📊</span>
                Generate PDF Report
              </button>
              <button
                onClick={() => alert("📧 Scheduling automated report delivery...")}
                style={{
                  ...styles.quickActionButton,
                  background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
                  color: "white",
                  boxShadow: "0 4px 20px rgba(139, 92, 246, 0.4)"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <span>📧</span>
                Schedule Reports
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
      `}</style>
    </>
  );
}