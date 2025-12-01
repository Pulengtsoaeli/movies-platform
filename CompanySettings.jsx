import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function CompanySettings() {
  const { user } = useAuth();

  const links = [
    { to: "/company/post-job", label: "Post Job", icon: "🚀" },
    { to: "/company/applicants", label: "View Applicants", icon: "👥" },
    { to: "/company/profile", label: "Update Profile", icon: "🏢" },
    { to: "/company/settings", label: "Settings", icon: "⚙️" },
  ];

  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [emailDigest, setEmailDigest] = useState(true);
  const [autoArchive, setAutoArchive] = useState(false);
  const [candidateAlerts, setCandidateAlerts] = useState(true);
  const [teamCollaboration, setTeamCollaboration] = useState(false);
  const [dataExport, setDataExport] = useState(true);

  const [activeSection, setActiveSection] = useState(null);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handlePasswordChange = async () => {
    setIsChangingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPassword(false);
    alert("Password updated successfully! 🔐");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("🚨 Are you absolutely sure you want to permanently delete your company account? This will erase all job postings, applicant data, and cannot be undone.")) {
      alert("Account deletion initiated");
    }
  };

  const styles = {
    container: {
      display: "flex",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
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
    main: {
      flex: 1,
      padding: "2rem",
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      minHeight: "100vh",
      position: "relative",
      zIndex: 1,
      borderLeft: "1px solid rgba(255, 255, 255, 0.1)"
    },
    content: {
      maxWidth: "900px",
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
      marginBottom: "2rem"
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
      marginBottom: "1.5rem",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
    },
    headerTitle: {
      fontSize: "3rem",
      fontWeight: 900,
      marginBottom: "1rem",
      background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow: "0 4px 20px rgba(0,0,0,0.3)"
    },
    headerSubtitle: {
      fontSize: "1.2rem",
      opacity: 0.9,
      fontWeight: 500,
      lineHeight: 1.6
    },
    settingsGrid: {
      display: "flex",
      flexDirection: "column",
      gap: "1.5rem"
    },
    settingsCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2.5rem",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    },
    cardHeader: {
      display: "flex",
      alignItems: "center",
      gap: "1.25rem",
      marginBottom: "2rem"
    },
    cardIcon: {
      width: "70px",
      height: "70px",
      borderRadius: "18px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      border: "2px solid",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)"
    },
    cardTitle: {
      fontSize: "1.8rem",
      fontWeight: 800,
      color: "white",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    settingsList: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    },
    settingItem: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "1.5rem",
      borderRadius: "18px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      background: "rgba(255, 255, 255, 0.05)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      backdropFilter: "blur(10px)"
    },
    settingContent: {
      display: "flex",
      alignItems: "center",
      gap: "1.25rem",
      flex: 1
    },
    settingIcon: {
      fontSize: "1.8rem",
      width: "50px",
      height: "50px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "12px",
      background: "rgba(255, 255, 255, 0.1)"
    },
    settingText: {
      flex: 1
    },
    settingLabel: {
      fontSize: "1.1rem",
      fontWeight: 700,
      color: "white",
      marginBottom: "0.25rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    settingDescription: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      lineHeight: 1.5
    },
    toggle: {
      position: "relative",
      display: "inline-block",
      width: "68px",
      height: "34px"
    },
    toggleInput: {
      opacity: 0,
      width: 0,
      height: 0
    },
    toggleSlider: {
      position: "absolute",
      cursor: "pointer",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      transition: "0.4s",
      borderRadius: "34px",
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
      border: "2px solid rgba(255, 255, 255, 0.1)"
    },
    toggleKnob: {
      position: "absolute",
      content: '""',
      height: "26px",
      width: "26px",
      left: "4px",
      bottom: "2px",
      backgroundColor: "white",
      transition: "0.4s",
      borderRadius: "50%",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)"
    },
    actionButton: {
      padding: "1.25rem 2.5rem",
      borderRadius: "15px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      color: "white",
      border: "none",
      cursor: "pointer",
      fontWeight: 700,
      fontSize: "1rem",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 4px 20px rgba(79, 172, 254, 0.4)",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      justifyContent: "center",
      width: "100%",
      maxWidth: "300px",
      marginTop: "1rem"
    },
    dangerZone: {
      background: "linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))",
      border: "1px solid rgba(239, 68, 68, 0.3)",
      backdropFilter: "blur(15px)"
    },
    dangerContent: {
      padding: "2rem",
      background: "rgba(239, 68, 68, 0.08)",
      borderRadius: "18px",
      border: "1px solid rgba(239, 68, 68, 0.2)",
      marginTop: "1rem"
    },
    dangerText: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.9)",
      fontWeight: 500,
      lineHeight: 1.6,
      marginBottom: "1.5rem"
    },
    dangerButton: {
      background: "linear-gradient(135deg, #ef4444, #dc2626)",
      boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)"
    }
  };

  const notificationSettings = [
    {
      label: "Real-time Application Alerts",
      description: "Instant notifications when qualified candidates apply to your positions",
      checked: notifications,
      onChange: () => setNotifications(!notifications),
      icon: "📨"
    },
    {
      label: "Candidate Match Alerts",
      description: "Get notified when high-potential candidates match your job criteria",
      checked: candidateAlerts,
      onChange: () => setCandidateAlerts(!candidateAlerts),
      icon: "🎯"
    },
    {
      label: "Weekly Performance Digest",
      description: "Comprehensive weekly reports on application activity and hiring metrics",
      checked: emailDigest,
      onChange: () => setEmailDigest(!emailDigest),
      icon: "📊"
    },
    {
      label: "Auto-Archive Expired Listings",
      description: "Automatically archive job postings and applications after 6 months",
      checked: autoArchive,
      onChange: () => setAutoArchive(!autoArchive),
      icon: "🗃️"
    }
  ];

  const securitySettings = [
    {
      label: "Two-Factor Authentication",
      description: "Enhanced security with mobile app verification for all logins",
      checked: twoFactor,
      onChange: () => setTwoFactor(!twoFactor),
      icon: "🔐"
    },
    {
      label: "Team Collaboration Mode",
      description: "Allow multiple team members to manage hiring processes",
      checked: teamCollaboration,
      onChange: () => setTeamCollaboration(!teamCollaboration),
      icon: "👥"
    },
    {
      label: "Automated Data Export",
      description: "Weekly export of candidate data to your preferred cloud storage",
      checked: dataExport,
      onChange: () => setDataExport(!dataExport),
      icon: "💾"
    }
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

        <Sidebar links={links} />

        <main style={styles.main}>
          <div style={styles.content}>
            {/* Header Section */}
            <div style={styles.header}>
              <div style={styles.headerIcon}>⚙️</div>
              <h1 style={styles.headerTitle}>Security & Preferences</h1>
              <p style={styles.headerSubtitle}>
                Customize your hiring platform experience with advanced security settings 
                and personalized notification preferences tailored for your recruitment team.
              </p>
            </div>

            {/* Settings Grid */}
            <div style={styles.settingsGrid}>
              {/* Notification Settings */}
              <div 
                style={{
                  ...styles.settingsCard,
                  borderColor: activeSection === 'notifications' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                  background: activeSection === 'notifications' 
                    ? 'rgba(79, 172, 254, 0.12)' 
                    : 'rgba(255, 255, 255, 0.08)'
                }}
                onMouseEnter={() => setActiveSection('notifications')}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div style={styles.cardHeader}>
                  <div style={{
                    ...styles.cardIcon,
                    background: "linear-gradient(135deg, rgba(79, 172, 254, 0.3), rgba(0, 242, 254, 0.2))",
                    borderColor: "rgba(79, 172, 254, 0.5)"
                  }}>
                    📧
                  </div>
                  <h3 style={styles.cardTitle}>Communication Preferences</h3>
                </div>

                <div style={styles.settingsList}>
                  {notificationSettings.map((setting, index) => (
                    <div
                      key={index}
                      style={{
                        ...styles.settingItem,
                        borderColor: activeSection === 'notifications' ? 'rgba(79, 172, 254, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        background: activeSection === 'notifications' 
                          ? 'rgba(79, 172, 254, 0.08)' 
                          : 'rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <div style={styles.settingContent}>
                        <div style={styles.settingIcon}>{setting.icon}</div>
                        <div style={styles.settingText}>
                          <div style={styles.settingLabel}>{setting.label}</div>
                          <div style={styles.settingDescription}>{setting.description}</div>
                        </div>
                      </div>
                      <label style={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={setting.checked}
                          onChange={setting.onChange}
                          style={styles.toggleInput}
                        />
                        <span style={{
                          ...styles.toggleSlider,
                          backgroundColor: setting.checked ? "#4facfe" : "rgba(255, 255, 255, 0.2)"
                        }}>
                          <span style={{
                            ...styles.toggleKnob,
                            left: setting.checked ? "34px" : "4px",
                            transform: setting.checked ? "scale(1.1)" : "scale(1)"
                          }} />
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security Settings */}
              <div 
                style={{
                  ...styles.settingsCard,
                  borderColor: activeSection === 'security' ? '#4ade80' : 'rgba(255, 255, 255, 0.1)',
                  background: activeSection === 'security' 
                    ? 'rgba(74, 222, 128, 0.12)' 
                    : 'rgba(255, 255, 255, 0.08)'
                }}
                onMouseEnter={() => setActiveSection('security')}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div style={styles.cardHeader}>
                  <div style={{
                    ...styles.cardIcon,
                    background: "linear-gradient(135deg, rgba(74, 222, 128, 0.3), rgba(34, 197, 94, 0.2))",
                    borderColor: "rgba(74, 222, 128, 0.5)"
                  }}>
                    🔒
                  </div>
                  <h3 style={styles.cardTitle}>Security & Access</h3>
                </div>

                <div style={styles.settingsList}>
                  {securitySettings.map((setting, index) => (
                    <div
                      key={index}
                      style={{
                        ...styles.settingItem,
                        borderColor: activeSection === 'security' ? 'rgba(74, 222, 128, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                        background: activeSection === 'security' 
                          ? 'rgba(74, 222, 128, 0.08)' 
                          : 'rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <div style={styles.settingContent}>
                        <div style={styles.settingIcon}>{setting.icon}</div>
                        <div style={styles.settingText}>
                          <div style={styles.settingLabel}>{setting.label}</div>
                          <div style={styles.settingDescription}>{setting.description}</div>
                        </div>
                      </div>
                      <label style={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={setting.checked}
                          onChange={setting.onChange}
                          style={styles.toggleInput}
                        />
                        <span style={{
                          ...styles.toggleSlider,
                          backgroundColor: setting.checked ? "#4ade80" : "rgba(255, 255, 255, 0.2)"
                        }}>
                          <span style={{
                            ...styles.toggleKnob,
                            left: setting.checked ? "34px" : "4px",
                            transform: setting.checked ? "scale(1.1)" : "scale(1)"
                          }} />
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handlePasswordChange}
                  disabled={isChangingPassword}
                  style={{
                    ...styles.actionButton,
                    opacity: isChangingPassword ? 0.7 : 1
                  }}
                >
                  {isChangingPassword ? (
                    <>
                      <span className="loading-spinner"></span>
                      Updating Security...
                    </>
                  ) : (
                    <>
                      <span>🔄</span>
                      Update Password & Security
                    </>
                  )}
                </button>
              </div>

              {/* Danger Zone */}
              <div 
                style={{
                  ...styles.settingsCard,
                  ...styles.dangerZone,
                  borderColor: activeSection === 'danger' ? '#ef4444' : 'rgba(239, 68, 68, 0.3)'
                }}
                onMouseEnter={() => setActiveSection('danger')}
                onMouseLeave={() => setActiveSection(null)}
              >
                <div style={styles.cardHeader}>
                  <div style={{
                    ...styles.cardIcon,
                    background: "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.2))",
                    borderColor: "rgba(239, 68, 68, 0.5)"
                  }}>
                    ⚠️
                  </div>
                  <h3 style={{...styles.cardTitle, color: "#fca5a5"}}>Critical Actions</h3>
                </div>

                <div style={styles.dangerContent}>
                  <p style={styles.dangerText}>
                    🚨 <strong>Permanent Account Deletion:</strong> This action cannot be reversed. 
                    All company data, job postings, candidate information, and team access will be 
                    permanently erased from our systems. Please ensure you have exported any 
                    necessary data before proceeding.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    style={{
                      ...styles.actionButton,
                      ...styles.dangerButton
                    }}
                  >
                    <span>🗑️</span>
                    Delete Company Account Permanently
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
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