import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function ManageInstitutions() {
  const { institutions, addInstitution, updateInstitution, deleteInstitution, faculties, addFaculty, deleteFaculty, courses, addCourse, deleteCourse } = useAppData();

  // Local states
  const [institutionName, setInstitutionName] = useState("");
  const [facultyName, setFacultyName] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [isAdding, setIsAdding] = useState({ institution: false, faculty: false, course: false });

  // Add new institution
  const handleAddInstitution = async () => {
    if (!institutionName.trim()) return alert("🎯 Please enter institution name");
    
    setIsAdding(prev => ({ ...prev, institution: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addInstitution({ 
      id: `inst_${Date.now()}`, 
      name: institutionName.trim(), 
      status: "approved",
      createdAt: new Date().toISOString(),
      location: "Main Campus",
      established: new Date().getFullYear()
    });
    setInstitutionName("");
    setIsAdding(prev => ({ ...prev, institution: false }));
  };

  // Add faculty under selected institution
  const handleAddFaculty = async () => {
    if (!selectedInstitution) return alert("🎯 Please select an institution first");
    if (!facultyName.trim()) return alert("🎯 Please enter faculty name");
    
    setIsAdding(prev => ({ ...prev, faculty: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addFaculty({
      id: `fac_${Date.now()}`,
      name: facultyName.trim(),
      institutionId: selectedInstitution.id,
      createdAt: new Date().toISOString(),
      departmentCount: Math.floor(Math.random() * 5) + 1
    });
    setFacultyName("");
    setIsAdding(prev => ({ ...prev, faculty: false }));
  };

  // Add course under selected faculty
  const handleAddCourse = async () => {
    if (!selectedFaculty) return alert("🎯 Please select a faculty first");
    if (!courseTitle.trim()) return alert("🎯 Please enter course title");
    
    setIsAdding(prev => ({ ...prev, course: true }));
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addCourse({
      id: `course_${Date.now()}`,
      title: courseTitle.trim(),
      facultyId: selectedFaculty.id,
      facultyName: selectedFaculty.name,
      institutionId: selectedFaculty.institutionId,
      createdAt: new Date().toISOString(),
      credits: 3,
      students: Math.floor(Math.random() * 200)
    });
    setCourseTitle("");
    setIsAdding(prev => ({ ...prev, course: false }));
  };

  // Filtered faculties and courses
  const facultiesForInstitution = faculties.filter(f => f.institutionId === selectedInstitution?.id);
  const coursesForFaculty = courses.filter(c => c.facultyId === selectedFaculty?.id);

  const getInstitutionStats = (institutionId) => {
    const institutionFaculties = faculties.filter(f => f.institutionId === institutionId);
    const institutionCourses = courses.filter(c => c.institutionId === institutionId);
    return { faculties: institutionFaculties.length, courses: institutionCourses.length };
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case "approved":
        return { 
          color: "#10b981", 
          bgColor: "rgba(16, 185, 129, 0.1)", 
          icon: "✅", 
          label: "Approved",
          gradient: "linear-gradient(135deg, #10b981, #34d399)"
        };
      case "suspended":
        return { 
          color: "#f59e0b", 
          bgColor: "rgba(245, 158, 11, 0.1)", 
          icon: "⏸️", 
          label: "Suspended",
          gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)"
        };
      default:
        return { 
          color: "#6b7280", 
          bgColor: "rgba(107, 114, 128, 0.1)", 
          icon: "⏳", 
          label: "Pending Review",
          gradient: "linear-gradient(135deg, #6b7280, #9ca3af)"
        };
    }
  };

  const stats = [
    { label: "Total Institutions", value: institutions.length, icon: "🏢", color: "#4facfe" },
    { label: "Active Institutions", value: institutions.filter(i => i.status === "approved").length, icon: "✅", color: "#10b981" },
    { label: "Total Faculties", value: faculties.length, icon: "🏛️", color: "#ff6b6b" },
    { label: "Total Courses", value: courses.length, icon: "📚", color: "#4ade80" }
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
    mainGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "2rem",
      marginBottom: "2rem"
    },
    formCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2.5rem",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      position: "relative",
      overflow: "hidden"
    },
    formTitle: {
      fontSize: "1.8rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "2rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
      marginBottom: "1.25rem"
    },
    formLabel: {
      fontWeight: 700,
      color: "white",
      fontSize: "0.9rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    formInput: {
      padding: "1rem 1.25rem",
      borderRadius: "12px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      fontSize: "1rem",
      background: "rgba(255, 255, 255, 0.08)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: 500,
      color: "white",
      backdropFilter: "blur(10px)",
      fontFamily: "inherit"
    },
    submitButton: {
      padding: "1.25rem 2rem",
      borderRadius: "15px",
      background: institutionName.trim() ? 
        "linear-gradient(135deg, #4facfe, #00f2fe)" : 
        "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      color: "white",
      border: "none",
      cursor: institutionName.trim() && !isAdding.institution ? "pointer" : "not-allowed",
      fontWeight: 700,
      fontSize: "1.1rem",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: institutionName.trim() ? "0 4px 20px rgba(79, 172, 254, 0.4)" : "none",
      marginTop: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      opacity: isAdding.institution ? 0.7 : 1
    },
    statsCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2.5rem",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    statsTitle: {
      fontSize: "1.8rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "2rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    statsGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem"
    },
    statItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1.5rem",
      borderRadius: "15px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      background: "rgba(255, 255, 255, 0.05)",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)"
    },
    statInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    },
    statIcon: {
      fontSize: "1.5rem",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "10px",
      background: "rgba(255, 255, 255, 0.1)"
    },
    statText: {
      display: "flex",
      flexDirection: "column",
      gap: "0.25rem"
    },
    statLabel: {
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "rgba(255, 255, 255, 0.8)"
    },
    statValue: {
      fontSize: "1.5rem",
      fontWeight: 800,
      color: "white"
    },
    institutionsCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "2.5rem",
      gridColumn: "1 / -1",
      marginBottom: "2rem"
    },
    institutionsHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "2rem"
    },
    institutionsTitle: {
      fontSize: "1.8rem",
      fontWeight: 800,
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    institutionsGrid: {
      display: "grid",
      gap: "1rem"
    },
    institutionCard: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "2rem",
      borderRadius: "18px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      backdropFilter: "blur(10px)"
    },
    institutionHeader: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: "1rem"
    },
    institutionInfo: {
      flex: 1
    },
    institutionName: {
      fontSize: "1.3rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "0.5rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    institutionMeta: {
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
    sectionCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "2.5rem",
      marginBottom: "2rem"
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "2rem"
    },
    sectionTitle: {
      fontSize: "1.8rem",
      fontWeight: 800,
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    nestedForm: {
      display: "flex",
      gap: "1rem",
      marginBottom: "2rem"
    },
    nestedInput: {
      flex: 1,
      padding: "1rem 1.25rem",
      borderRadius: "12px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      fontSize: "1rem",
      background: "rgba(255, 255, 255, 0.08)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: 500,
      color: "white",
      backdropFilter: "blur(10px)",
      fontFamily: "inherit"
    },
    nestedButton: {
      padding: "1rem 2rem",
      borderRadius: "12px",
      border: "none",
      cursor: "pointer",
      fontWeight: 600,
      fontSize: "1rem",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
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
            <div style={styles.headerIcon}>🏢</div>
            <h1 style={styles.headerTitle}>Institution Management</h1>
            <p style={styles.headerSubtitle}>
              Comprehensive management of institutions, faculties, and courses with hierarchical oversight
            </p>
          </div>

          <div style={styles.mainGrid}>
            {/* Add Institution Form */}
            <div style={styles.formCard}>
              <h3 style={styles.formTitle}>
                <span>🚀</span> Register New Institution
              </h3>

              <div style={styles.formGroup}>
                <label style={styles.formLabel}>
                  <span>📝</span> Institution Name
                </label>
                <input
                  type="text"
                  placeholder="Enter institution name"
                  value={institutionName}
                  onChange={e => setInstitutionName(e.target.value)}
                  style={{
                    ...styles.formInput,
                    borderColor: activeField === 'institution' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                    background: activeField === 'institution' 
                      ? 'rgba(255, 255, 255, 0.12)' 
                      : 'rgba(255, 255, 255, 0.08)',
                    boxShadow: activeField === 'institution' 
                      ? '0 0 20px rgba(79, 172, 254, 0.3)' 
                      : 'none'
                  }}
                  onFocus={() => setActiveField('institution')}
                  onBlur={() => setActiveField(null)}
                />
              </div>

              <button
                onClick={handleAddInstitution}
                disabled={!institutionName.trim() || isAdding.institution}
                style={{
                  ...styles.submitButton,
                  transform: activeField === 'submitInstitution' ? 'translateY(-3px)' : 'translateY(0)',
                  boxShadow: activeField === 'submitInstitution' 
                    ? '0 8px 30px rgba(79, 172, 254, 0.6)' 
                    : institutionName.trim() ? '0 4px 20px rgba(79, 172, 254, 0.4)' : 'none'
                }}
                onMouseEnter={() => setActiveField('submitInstitution')}
                onMouseLeave={() => setActiveField(null)}
              >
                {isAdding.institution ? (
                  <>
                    <span className="loading-spinner"></span>
                    Registering Institution...
                  </>
                ) : (
                  <>
                    <span>🎯</span>
                    Register Institution
                    <span>→</span>
                  </>
                )}
              </button>
            </div>

            {/* Statistics Card */}
            <div style={styles.statsCard}>
              <h3 style={styles.statsTitle}>
                <span>📊</span> Academic Ecosystem
              </h3>
              <div style={styles.statsGrid}>
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    style={styles.statItem}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div style={styles.statInfo}>
                      <div style={{
                        ...styles.statIcon,
                        background: `linear-gradient(135deg, ${stat.color}30, ${stat.color}15)`,
                        border: `1px solid ${stat.color}`
                      }}>
                        {stat.icon}
                      </div>
                      <div style={styles.statText}>
                        <div style={styles.statLabel}>{stat.label}</div>
                        <div style={{...styles.statValue, color: stat.color}}>
                          {stat.value}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Institutions List */}
            <div style={styles.institutionsCard}>
              <div style={styles.institutionsHeader}>
                <h3 style={styles.institutionsTitle}>
                  <span>📋</span> Institution Directory
                </h3>
                <div style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#4facfe"
                }}>
                  {institutions.length} Institutions
                </div>
              </div>

              {institutions.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>🏢</div>
                  <h3 style={styles.emptyTitle}>No Institutions Registered</h3>
                  <p style={styles.emptyText}>
                    Start by registering a new institution using the form above to build your academic ecosystem
                  </p>
                </div>
              ) : (
                <div style={styles.institutionsGrid}>
                  {institutions.map(inst => {
                    const stats = getInstitutionStats(inst.id);
                    const statusConfig = getStatusConfig(inst.status);
                    
                    return (
                      <div
                        key={inst.id}
                        style={styles.institutionCard}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.transform = "translateY(-3px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div style={styles.institutionHeader}>
                          <div style={styles.institutionInfo}>
                            <h4 style={styles.institutionName}>{inst.name}</h4>
                            <div style={styles.institutionMeta}>
                              <div style={styles.metaItem}>
                                <span>🏛️</span>
                                {stats.faculties} Faculties
                              </div>
                              <div style={styles.metaItem}>
                                <span>📚</span>
                                {stats.courses} Courses
                              </div>
                              <div style={styles.metaItem}>
                                <span>📍</span>
                                {inst.location || "Main Campus"}
                              </div>
                              <div style={styles.metaItem}>
                                <span>📅</span>
                                Est. {inst.established || new Date().getFullYear()}
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
                          <button
                            onClick={() => setSelectedInstitution(inst)}
                            style={{
                              ...styles.actionButton,
                              background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                              color: "white"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                          >
                            <span>⚙️</span>
                            Manage Structure
                          </button>
                          <button
                            onClick={() => updateInstitution(inst.id, { status: "approved" })}
                            style={{
                              ...styles.actionButton,
                              background: "linear-gradient(135deg, #10b981, #34d399)",
                              color: "white"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                          >
                            <span>✅</span>
                            Approve Access
                          </button>
                          <button
                            onClick={() => updateInstitution(inst.id, { status: "suspended" })}
                            style={{
                              ...styles.actionButton,
                              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                              color: "white"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                          >
                            <span>⏸️</span>
                            Suspend Account
                          </button>
                          <button
                            onClick={() => {
                              if (stats.faculties > 0 || stats.courses > 0) {
                                if (!window.confirm(`🚨 This institution has ${stats.faculties} faculties and ${stats.courses} courses. Deleting it will remove all associated data. Are you sure?`)) {
                                  return;
                                }
                              }
                              if (window.confirm(`🗑️ Are you sure you want to delete "${inst.name}"?`)) {
                                deleteInstitution(inst.id);
                              }
                            }}
                            style={{
                              ...styles.actionButton,
                              background: stats.faculties > 0 || stats.courses > 0
                                ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
                                : "linear-gradient(135deg, #ef4444, #f87171)",
                              color: "white"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                          >
                            {stats.faculties > 0 || stats.courses > 0 ? "⚠️" : "🗑️"}
                            {stats.faculties > 0 || stats.courses > 0 ? "Delete with Data" : "Delete Institution"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Faculties Section */}
            {selectedInstitution && (
              <div style={styles.sectionCard}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>
                    <span>🏛️</span> 
                    Faculty Structure - <span style={{ color: "#4facfe" }}>{selectedInstitution.name}</span>
                  </h3>
                  <button
                    onClick={() => setSelectedInstitution(null)}
                    style={{
                      ...styles.actionButton,
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "white"
                    }}
                  >
                    ← Back to Institutions
                  </button>
                </div>

                <div style={styles.nestedForm}>
                  <input
                    placeholder="Enter faculty name (e.g., Faculty of Engineering)"
                    value={facultyName}
                    onChange={e => setFacultyName(e.target.value)}
                    style={{
                      ...styles.nestedInput,
                      borderColor: activeField === 'faculty' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                      background: activeField === 'faculty' 
                        ? 'rgba(255, 255, 255, 0.12)' 
                        : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: activeField === 'faculty' 
                        ? '0 0 20px rgba(79, 172, 254, 0.3)' 
                        : 'none'
                    }}
                    onFocus={() => setActiveField('faculty')}
                    onBlur={() => setActiveField(null)}
                  />
                  <button
                    onClick={handleAddFaculty}
                    disabled={!facultyName.trim() || isAdding.faculty}
                    style={{
                      ...styles.nestedButton,
                      background: facultyName.trim() ? 
                        "linear-gradient(135deg, #4facfe, #00f2fe)" : 
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                      color: "white",
                      cursor: facultyName.trim() && !isAdding.faculty ? "pointer" : "not-allowed",
                      boxShadow: facultyName.trim() ? "0 4px 20px rgba(79, 172, 254, 0.4)" : "none",
                      opacity: isAdding.faculty ? 0.7 : 1
                    }}
                  >
                    {isAdding.faculty ? (
                      <>
                        <span className="loading-spinner"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <span>➕</span>
                        Add Faculty
                      </>
                    )}
                  </button>
                </div>

                {facultiesForInstitution.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>🏛️</div>
                    <h3 style={styles.emptyTitle}>No Faculties Created</h3>
                    <p style={styles.emptyText}>
                      Add faculties to organize courses and academic programs within this institution
                    </p>
                  </div>
                ) : (
                  <div style={styles.institutionsGrid}>
                    {facultiesForInstitution.map(f => {
                      const facultyCourses = courses.filter(c => c.facultyId === f.id);
                      
                      return (
                        <div
                          key={f.id}
                          style={styles.institutionCard}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                            e.currentTarget.style.transform = "translateY(-3px)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                            e.currentTarget.style.transform = "translateY(0)";
                          }}
                        >
                          <div style={styles.institutionHeader}>
                            <div style={styles.institutionInfo}>
                              <h4 style={styles.institutionName}>{f.name}</h4>
                              <div style={styles.institutionMeta}>
                                <div style={styles.metaItem}>
                                  <span>📚</span>
                                  {facultyCourses.length} Courses
                                </div>
                                <div style={styles.metaItem}>
                                  <span>🏢</span>
                                  {f.departmentCount || 1} Departments
                                </div>
                                <div style={styles.metaItem}>
                                  <span>👨‍🏫</span>
                                  {Math.floor(Math.random() * 20) + 5} Staff
                                </div>
                              </div>
                            </div>
                          </div>

                          <div style={styles.actionButtons}>
                            <button
                              onClick={() => setSelectedFaculty(f)}
                              style={{
                                ...styles.actionButton,
                                background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                                color: "white"
                              }}
                              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                            >
                              <span>📖</span>
                              Manage Courses
                            </button>
                            <button
                              onClick={() => {
                                if (facultyCourses.length > 0) {
                                  if (!window.confirm(`🚨 This faculty has ${facultyCourses.length} courses. Deleting it will remove all associated courses. Are you sure?`)) {
                                    return;
                                  }
                                }
                                if (window.confirm(`🗑️ Are you sure you want to delete "${f.name}"?`)) {
                                  deleteFaculty(f.id);
                                }
                              }}
                              style={{
                                ...styles.actionButton,
                                background: facultyCourses.length > 0
                                  ? "linear-gradient(135deg, #f59e0b, #fbbf24)"
                                  : "linear-gradient(135deg, #ef4444, #f87171)",
                                color: "white"
                              }}
                              onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                              onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                            >
                              {facultyCourses.length > 0 ? "⚠️" : "🗑️"}
                              {facultyCourses.length > 0 ? "Delete with Courses" : "Delete Faculty"}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Courses Section */}
            {selectedFaculty && (
              <div style={styles.sectionCard}>
                <div style={styles.sectionHeader}>
                  <h3 style={styles.sectionTitle}>
                    <span>📖</span> 
                    Course Catalog - <span style={{ color: "#4facfe" }}>{selectedFaculty.name}</span>
                  </h3>
                  <button
                    onClick={() => setSelectedFaculty(null)}
                    style={{
                      ...styles.actionButton,
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "white"
                    }}
                  >
                    ← Back to Faculties
                  </button>
                </div>

                <div style={styles.nestedForm}>
                  <input
                    placeholder="Enter course title"
                    value={courseTitle}
                    onChange={e => setCourseTitle(e.target.value)}
                    style={{
                      ...styles.nestedInput,
                      borderColor: activeField === 'course' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                      background: activeField === 'course' 
                        ? 'rgba(255, 255, 255, 0.12)' 
                        : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: activeField === 'course' 
                        ? '0 0 20px rgba(79, 172, 254, 0.3)' 
                        : 'none'
                    }}
                    onFocus={() => setActiveField('course')}
                    onBlur={() => setActiveField(null)}
                  />
                  <button
                    onClick={handleAddCourse}
                    disabled={!courseTitle.trim() || isAdding.course}
                    style={{
                      ...styles.nestedButton,
                      background: courseTitle.trim() ? 
                        "linear-gradient(135deg, #4facfe, #00f2fe)" : 
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                      color: "white",
                      cursor: courseTitle.trim() && !isAdding.course ? "pointer" : "not-allowed",
                      boxShadow: courseTitle.trim() ? "0 4px 20px rgba(79, 172, 254, 0.4)" : "none",
                      opacity: isAdding.course ? 0.7 : 1
                    }}
                  >
                    {isAdding.course ? (
                      <>
                        <span className="loading-spinner"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <span>➕</span>
                        Add Course
                      </>
                    )}
                  </button>
                </div>

                {coursesForFaculty.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>📖</div>
                    <h3 style={styles.emptyTitle}>No Courses Available</h3>
                    <p style={styles.emptyText}>
                      Create courses to build the academic curriculum for this faculty
                    </p>
                  </div>
                ) : (
                  <div style={styles.institutionsGrid}>
                    {coursesForFaculty.map(c => (
                      <div
                        key={c.id}
                        style={styles.institutionCard}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.transform = "translateY(-3px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div style={styles.institutionHeader}>
                          <div style={styles.institutionInfo}>
                            <h4 style={styles.institutionName}>{c.title}</h4>
                            <div style={styles.institutionMeta}>
                              <div style={styles.metaItem}>
                                <span>⏱️</span>
                                {c.credits || 3} Credits
                              </div>
                              <div style={styles.metaItem}>
                                <span>👨‍🎓</span>
                                {c.students || 0} Students
                              </div>
                              <div style={styles.metaItem}>
                                <span>📅</span>
                                Added {new Date(c.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div style={styles.actionButtons}>
                          <button
                            onClick={() => {
                              if (window.confirm(`🗑️ Are you sure you want to delete "${c.title}"?`)) {
                                deleteCourse(c.id);
                              }
                            }}
                            style={{
                              ...styles.actionButton,
                              background: "linear-gradient(135deg, #ef4444, #f87171)",
                              color: "white"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                          >
                            🗑️ Delete Course
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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