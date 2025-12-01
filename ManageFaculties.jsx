import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function ManageFaculties() {
  const { faculties, addFaculty, deleteFaculty, institutions, courses } = useAppData();
  const [name, setName] = useState("");
  const [institutionId, setInstitutionId] = useState("");
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activeField, setActiveField] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!name.trim() || !institutionId) 
      return alert("🎯 Please select institution and enter faculty name");
    
    setIsAdding(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addFaculty({
      id: `fac_${Date.now()}`, 
      name: name.trim(), 
      institutionId,
      description: description.trim(),
      createdAt: new Date().toISOString(),
      departmentCount: Math.floor(Math.random() * 5) + 1
    });
    
    setName("");
    setInstitutionId("");
    setDescription("");
    setIsAdding(false);
  };

  const getInstitutionName = (institutionId) => {
    return institutions.find(i => i.id === institutionId)?.name || "Unknown Institution";
  };

  const getFacultyCourses = (facultyId) => {
    return courses.filter(c => c.facultyId === facultyId);
  };

  const stats = [
    { label: "Total Faculties", value: faculties.length, icon: "🏛️", color: "#4facfe" },
    { label: "Institutions", value: new Set(faculties.map(f => f.institutionId)).size, icon: "🏫", color: "#ff6b6b" },
    { label: "Total Courses", value: courses.length, icon: "📚", color: "#4ade80" },
    { label: "Avg Courses/Faculty", value: faculties.length > 0 ? Math.round(courses.length / faculties.length) : 0, icon: "📊", color: "#f59e0b" }
  ];

  const tabs = [
    { key: "all", label: "All Faculties", icon: "🏛️", count: faculties.length },
    { key: "engineering", label: "Engineering", icon: "⚙️", count: faculties.filter(f => f.name?.toLowerCase().includes("engineering")).length },
    { key: "science", label: "Science", icon: "🔬", count: faculties.filter(f => f.name?.toLowerCase().includes("science")).length },
    { key: "business", label: "Business", icon: "💼", count: faculties.filter(f => f.name?.toLowerCase().includes("business")).length }
  ];

  const formFields = [
    { 
      label: "Select Institution", 
      value: institutionId, 
      onChange: (e) => setInstitutionId(e.target.value),
      placeholder: "Select Institution",
      icon: "🏫",
      type: "select"
    },
    { 
      label: "Faculty Name", 
      value: name, 
      onChange: (e) => setName(e.target.value),
      placeholder: "e.g., Faculty of Engineering",
      icon: "📝",
      type: "input"
    },
    { 
      label: "Description", 
      value: description, 
      onChange: (e) => setDescription(e.target.value),
      placeholder: "Brief description of the faculty...",
      icon: "📋",
      type: "textarea"
    }
  ];

  const filteredFaculties = activeTab === "all" 
    ? faculties 
    : faculties.filter(f => f.name?.toLowerCase().includes(activeTab));

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
    formGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      position: "relative",
      zIndex: 2
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
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
    formSelect: {
      padding: "1rem 1.25rem",
      borderRadius: "12px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      fontSize: "1rem",
      background: "rgba(255, 255, 255, 0.08)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: 500,
      color: "white",
      backdropFilter: "blur(10px)",
      fontFamily: "inherit",
      cursor: "pointer"
    },
    formTextarea: {
      padding: "1rem 1.25rem",
      borderRadius: "12px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      fontSize: "1rem",
      background: "rgba(255, 255, 255, 0.08)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: 500,
      color: "white",
      backdropFilter: "blur(10px)",
      fontFamily: "inherit",
      minHeight: "100px",
      resize: "vertical"
    },
    submitButton: {
      padding: "1.25rem 2rem",
      borderRadius: "15px",
      background: (name.trim() && institutionId) ? 
        "linear-gradient(135deg, #4facfe, #00f2fe)" : 
        "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      color: "white",
      border: "none",
      cursor: (name.trim() && institutionId && !isAdding) ? "pointer" : "not-allowed",
      fontWeight: 700,
      fontSize: "1.1rem",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: (name.trim() && institutionId) ? "0 4px 20px rgba(79, 172, 254, 0.4)" : "none",
      marginTop: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      opacity: isAdding ? 0.7 : 1
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
    facultiesCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "2.5rem",
      gridColumn: "1 / -1"
    },
    facultiesHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "2rem"
    },
    facultiesTitle: {
      fontSize: "1.8rem",
      fontWeight: 800,
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
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
    facultiesGrid: {
      display: "grid",
      gap: "1rem"
    },
    facultyCard: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "2rem",
      borderRadius: "18px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      backdropFilter: "blur(10px)"
    },
    facultyHeader: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: "1rem"
    },
    facultyInfo: {
      flex: 1
    },
    facultyName: {
      fontSize: "1.3rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "0.5rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    facultyDescription: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.7)",
      lineHeight: 1.5,
      marginBottom: "1rem"
    },
    facultyMeta: {
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
            <div style={styles.headerIcon}>🏛️</div>
            <h1 style={styles.headerTitle}>Faculty Management</h1>
            <p style={styles.headerSubtitle}>
              Create and manage academic faculties across institutions with comprehensive oversight and analytics
            </p>
          </div>

          <div style={styles.mainGrid}>
            {/* Add Faculty Form */}
            <div style={styles.formCard}>
              <h3 style={styles.formTitle}>
                <span>🚀</span> Create New Faculty
              </h3>

              <div style={styles.formGrid}>
                {formFields.map((field, index) => (
                  <div key={index} style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <span>{field.icon}</span> {field.label}
                    </label>
                    
                    {field.type === "select" ? (
                      <select
                        value={field.value}
                        onChange={field.onChange}
                        style={{
                          ...styles.formSelect,
                          borderColor: activeField === field.label ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                          background: activeField === field.label 
                            ? 'rgba(255, 255, 255, 0.12)' 
                            : 'rgba(255, 255, 255, 0.08)',
                          boxShadow: activeField === field.label 
                            ? '0 0 20px rgba(79, 172, 254, 0.3)' 
                            : 'none'
                        }}
                        onFocus={() => setActiveField(field.label)}
                        onBlur={() => setActiveField(null)}
                      >
                        <option value="">Select Institution</option>
                        {institutions.map((i) => (
                          <option key={i.id} value={i.id}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "textarea" ? (
                      <textarea
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={field.placeholder}
                        style={{
                          ...styles.formTextarea,
                          borderColor: activeField === field.label ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                          background: activeField === field.label 
                            ? 'rgba(255, 255, 255, 0.12)' 
                            : 'rgba(255, 255, 255, 0.08)',
                          boxShadow: activeField === field.label 
                            ? '0 0 20px rgba(79, 172, 254, 0.3)' 
                            : 'none'
                        }}
                        onFocus={() => setActiveField(field.label)}
                        onBlur={() => setActiveField(null)}
                      />
                    ) : (
                      <input
                        type="text"
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={field.placeholder}
                        style={{
                          ...styles.formInput,
                          borderColor: activeField === field.label ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                          background: activeField === field.label 
                            ? 'rgba(255, 255, 255, 0.12)' 
                            : 'rgba(255, 255, 255, 0.08)',
                          boxShadow: activeField === field.label 
                            ? '0 0 20px rgba(79, 172, 254, 0.3)' 
                            : 'none'
                        }}
                        onFocus={() => setActiveField(field.label)}
                        onBlur={() => setActiveField(null)}
                      />
                    )}
                  </div>
                ))}

                <button
                  onClick={handleAdd}
                  disabled={!name.trim() || !institutionId || isAdding}
                  style={{
                    ...styles.submitButton,
                    transform: activeField === 'submit' ? 'translateY(-3px)' : 'translateY(0)',
                    boxShadow: activeField === 'submit' 
                      ? '0 8px 30px rgba(79, 172, 254, 0.6)' 
                      : (name.trim() && institutionId) ? '0 4px 20px rgba(79, 172, 254, 0.4)' : 'none'
                  }}
                  onMouseEnter={() => setActiveField('submit')}
                  onMouseLeave={() => setActiveField(null)}
                >
                  {isAdding ? (
                    <>
                      <span className="loading-spinner"></span>
                      Creating Faculty...
                    </>
                  ) : (
                    <>
                      <span>🎯</span>
                      Create Faculty
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Statistics Card */}
            <div style={styles.statsCard}>
              <h3 style={styles.statsTitle}>
                <span>📊</span> Academic Structure
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

            {/* Faculties List */}
            <div style={styles.facultiesCard}>
              <div style={styles.facultiesHeader}>
                <h3 style={styles.facultiesTitle}>
                  <span>📋</span> Faculty Directory
                </h3>
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
              </div>

              {filteredFaculties.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>
                    {activeTab === "all" ? "🏛️" : 
                     activeTab === "engineering" ? "⚙️" :
                     activeTab === "science" ? "🔬" : "💼"}
                  </div>
                  <h3 style={styles.emptyTitle}>
                    {activeTab === "all" ? "No Faculties Available" : 
                     activeTab === "engineering" ? "No Engineering Faculties" :
                     activeTab === "science" ? "No Science Faculties" : "No Business Faculties"}
                  </h3>
                  <p style={styles.emptyText}>
                    {activeTab === "all" 
                      ? "Start by creating a new faculty using the form above"
                      : `No faculties found in the ${activeTab} category`}
                  </p>
                </div>
              ) : (
                <div style={styles.facultiesGrid}>
                  {filteredFaculties.map((faculty) => {
                    const facultyCourses = getFacultyCourses(faculty.id);
                    
                    return (
                      <div
                        key={faculty.id}
                        style={styles.facultyCard}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.transform = "translateY(-3px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div style={styles.facultyHeader}>
                          <div style={styles.facultyInfo}>
                            <h4 style={styles.facultyName}>{faculty.name}</h4>
                            {faculty.description && (
                              <p style={styles.facultyDescription}>{faculty.description}</p>
                            )}
                            <div style={styles.facultyMeta}>
                              <div style={styles.metaItem}>
                                <span>🏫</span>
                                {getInstitutionName(faculty.institutionId)}
                              </div>
                              <div style={styles.metaItem}>
                                <span>📚</span>
                                {facultyCourses.length} Courses
                              </div>
                              <div style={styles.metaItem}>
                                <span>🏢</span>
                                {faculty.departmentCount || 1} Departments
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
                            onClick={() => {
                              if (facultyCourses.length > 0) {
                                if (!window.confirm(`🚨 This faculty has ${facultyCourses.length} courses. Deleting it will remove all associated courses. Are you sure?`)) {
                                  return;
                                }
                              }
                              if (window.confirm(`🗑️ Are you sure you want to delete "${faculty.name}"?`)) {
                                deleteFaculty(faculty.id);
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