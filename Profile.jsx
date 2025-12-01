import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [profileProgress, setProfileProgress] = useState(65);

  const tabs = [
    { id: "personal", label: "Personal Info", icon: "👤", color: "#4facfe" },
    { id: "security", label: "Security", icon: "🔒", color: "#10b981" },
    { id: "preferences", label: "Preferences", icon: "⚙️", color: "#f59e0b" },
    { id: "documents", label: "Documents", icon: "📄", color: "#8b5cf6" }
  ];

  const handleSave = async () => {
    if (!name.trim()) return;
    setSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateUser({ ...user, name: name.trim() });
    setSaving(false);
  };

  const getRoleIcon = (role) => {
    const icons = {
      student: "🎓",
      admin: "⚙️",
      institute: "🏫",
      company: "💼"
    };
    return icons[role] || "👤";
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
    shape3: { width: "200px", height: "200px", top: "40%", right: "15%", animationDelay: "6s" },
    gridPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      backgroundSize: "60px 60px"
    },
    content: {
      position: "relative",
      zIndex: 1,
      padding: "2rem",
      maxWidth: "1000px",
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
    mainLayout: {
      display: "grid",
      gridTemplateColumns: "300px 1fr",
      gap: "2rem"
    },
    sidebar: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      height: "fit-content"
    },
    userCard: {
      textAlign: "center",
      marginBottom: "2rem"
    },
    avatar: {
      width: "80px",
      height: "80px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      margin: "0 auto 1rem",
      boxShadow: "0 8px 20px rgba(79, 172, 254, 0.3)"
    },
    userName: {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
      color: "white"
    },
    userRole: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 600,
      background: "rgba(255, 255, 255, 0.1)",
      padding: "0.5rem 1rem",
      borderRadius: "10px",
      marginBottom: "1rem"
    },
    progressSection: {
      marginBottom: "2rem"
    },
    progressHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "0.5rem"
    },
    progressLabel: {
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "rgba(255, 255, 255, 0.7)"
    },
    progressValue: {
      fontSize: "0.9rem",
      fontWeight: 700,
      color: "#4facfe"
    },
    progressBar: {
      width: "100%",
      height: "6px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "3px",
      overflow: "hidden"
    },
    progressFill: {
      height: "100%",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "3px",
      transition: "width 1s ease",
      width: `${profileProgress}%`
    },
    tabList: {
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem"
    },
    tabButton: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem 1.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "left"
    },
    contentArea: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    formGroup: {
      marginBottom: "2rem"
    },
    label: {
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      marginBottom: "1rem"
    },
    input: {
      width: "100%",
      padding: "1.2rem 1.5rem",
      background: "rgba(255, 255, 255, 0.08)",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      color: "white",
      fontSize: "1rem",
      fontWeight: 500,
      transition: "all 0.3s ease"
    },
    readOnlyInput: {
      width: "100%",
      padding: "1.2rem 1.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      color: "rgba(255, 255, 255, 0.5)",
      fontSize: "1rem",
      fontWeight: 500,
      cursor: "not-allowed"
    },
    helpText: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.5)",
      fontWeight: 500,
      marginTop: "0.5rem",
      marginBottom: 0
    },
    actionButtons: {
      display: "flex",
      gap: "1rem",
      marginTop: "2rem"
    },
    primaryButton: {
      padding: "1.2rem 2.5rem",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      color: "white",
      border: "none",
      borderRadius: "15px",
      fontSize: "1.1rem",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 8px 25px rgba(79, 172, 254, 0.4)",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
    },
    secondaryButton: {
      padding: "1.2rem 2.5rem",
      background: "rgba(255, 255, 255, 0.1)",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "15px",
      fontSize: "1.1rem",
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
      marginTop: "2rem"
    },
    statCard: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "1.5rem",
      borderRadius: "15px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center"
    },
    statIcon: {
      fontSize: "2rem",
      marginBottom: "1rem"
    },
    statValue: {
      fontSize: "1.5rem",
      fontWeight: 800,
      marginBottom: "0.5rem",
      color: "white"
    },
    statLabel: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 600
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
            <div style={styles.headerIcon}>👤</div>
            <h1 style={styles.title}>Profile Studio</h1>
            <p style={styles.subtitle}>
              Manage your digital identity and personalize your learning journey
            </p>
          </header>

          <div style={styles.mainLayout}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
              <div style={styles.userCard}>
                <div style={styles.avatar}>
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <h3 style={styles.userName}>{user.name}</h3>
                <div style={styles.userRole}>
                  <span>{getRoleIcon(user.role)}</span>
                  {user.role}
                </div>
              </div>

              <div style={styles.progressSection}>
                <div style={styles.progressHeader}>
                  <span style={styles.progressLabel}>Profile Completion</span>
                  <span style={styles.progressValue}>{profileProgress}%</span>
                </div>
                <div style={styles.progressBar}>
                  <div style={styles.progressFill}></div>
                </div>
              </div>

              <nav style={styles.tabList}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    style={{
                      ...styles.tabButton,
                      background: activeTab === tab.id 
                        ? `linear-gradient(135deg, ${tab.color}20, ${tab.color}10)`
                        : "rgba(255, 255, 255, 0.05)",
                      borderColor: activeTab === tab.id ? tab.color : "rgba(255, 255, 255, 0.1)",
                      color: activeTab === tab.id ? "white" : "rgba(255, 255, 255, 0.7)",
                      transform: activeTab === tab.id ? "scale(1.02)" : "scale(1)"
                    }}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Main Content */}
            <main style={styles.contentArea}>
              {activeTab === "personal" && (
                <>
                  <h2 style={{ 
                    fontSize: "1.8rem", 
                    fontWeight: 700, 
                    marginBottom: "2rem",
                    color: "white"
                  }}>
                    Personal Information
                  </h2>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <span>👤</span>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        ...styles.input,
                        borderColor: name ? "#4facfe" : "rgba(255, 255, 255, 0.1)"
                      }}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <span>📧</span>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      readOnly
                      style={styles.readOnlyInput}
                      placeholder="Your email address"
                    />
                    <p style={styles.helpText}>
                      Email cannot be changed for security reasons. Contact support for assistance.
                    </p>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <span>🎯</span>
                      Account Role
                    </label>
                    <div style={{
                      ...styles.readOnlyInput,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem"
                    }}>
                      <span style={{ fontSize: "1.2rem" }}>{getRoleIcon(user.role)}</span>
                      <span style={{ textTransform: "capitalize" }}>{user.role}</span>
                    </div>
                    <p style={styles.helpText}>
                      Your role determines available features and access levels within the platform.
                    </p>
                  </div>

                  <div style={styles.actionButtons}>
                    <button
                      onClick={handleSave}
                      disabled={saving || !name.trim()}
                      style={{
                        ...styles.primaryButton,
                        opacity: saving || !name.trim() ? 0.6 : 1,
                        cursor: saving || !name.trim() ? "not-allowed" : "pointer"
                      }}
                      onMouseOver={(e) => !saving && name.trim() && (e.currentTarget.style.transform = "translateY(-2px)")}
                      onMouseOut={(e) => !saving && name.trim() && (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      {saving ? (
                        <>
                          <span className="spinner">⏳</span>
                          Saving Changes...
                        </>
                      ) : (
                        <>
                          <span>💾</span>
                          Update Profile
                        </>
                      )}
                    </button>
                    
                    <button
                      style={styles.secondaryButton}
                      onMouseOver={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"}
                      onMouseOut={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                    >
                      <span>🔄</span>
                      Cancel
                    </button>
                  </div>

                  {/* Profile Stats */}
                  <div style={styles.statsGrid}>
                    {[
                      { icon: "📝", value: "12", label: "Applications" },
                      { icon: "✅", value: "8", label: "Accepted" },
                      { icon: "⭐", value: "15", label: "Saved Jobs" },
                      { icon: "📅", value: "45", label: "Days Active" }
                    ].map((stat, index) => (
                      <div key={index} style={styles.statCard}>
                        <div style={styles.statIcon}>{stat.icon}</div>
                        <div style={styles.statValue}>{stat.value}</div>
                        <div style={styles.statLabel}>{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {activeTab === "security" && (
                <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem", opacity: 0.5 }}>🔒</div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem" }}>
                    Security Settings
                  </h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.6 }}>
                    Enhanced security features coming soon. Manage your password, two-factor authentication, 
                    and account security preferences here.
                  </p>
                </div>
              )}

              {activeTab === "preferences" && (
                <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem", opacity: 0.5 }}>⚙️</div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem" }}>
                    Preferences
                  </h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.6 }}>
                    Customize your experience with notification settings, theme preferences, 
                    and application defaults.
                  </p>
                </div>
              )}

              {activeTab === "documents" && (
                <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                  <div style={{ fontSize: "4rem", marginBottom: "1rem", opacity: 0.5 }}>📄</div>
                  <h3 style={{ fontSize: "1.8rem", fontWeight: 700, marginBottom: "1rem" }}>
                    Document Vault
                  </h3>
                  <p style={{ color: "rgba(255, 255, 255, 0.7)", lineHeight: 1.6 }}>
                    Upload and manage your transcripts, certificates, resumes, and other important 
                    documents for quick access during applications.
                  </p>
                </div>
              )}
            </main>
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
        
        .spinner {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}