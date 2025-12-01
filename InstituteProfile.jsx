import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";

export default function InstituteProfile() {
  const { user } = useAuth();
  const [activeField, setActiveField] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem(`institute_profile_${user?.id}`)) || {
          name: user?.name || "",
          email: "",
          phone: "",
          address: "",
          description: "",
          logo: "",
          website: "",
          established: "",
          type: "university"
        }
      );
    } catch {
      return {
        name: user?.name || "",
        email: "",
        phone: "",
        address: "",
        description: "",
        logo: "",
        website: "",
        established: "",
        type: "university"
      };
    }
  });

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`institute_profile_${user.id}`, JSON.stringify(profile));
    }
  }, [profile, user]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      alert("File size too large. Please choose an image under 5MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setProfile(p => ({ ...p, logo: reader.result }));
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  const sidebarLinks = [
    { to: "/institute/profile", label: "Institution Profile", icon: "👤" },
    { to: "/institute/faculties", label: "Faculty Management", icon: "🏛️" },
    { to: "/institute/courses", label: "Course Catalog", icon: "📚" },
    { to: "/institute/applications", label: "Applications Hub", icon: "📝" },
  ];

  const institutionTypes = [
    { value: "university", label: "🏛️ University", color: "#4facfe" },
    { value: "college", label: "🎓 College", color: "#10b981" },
    { value: "polytechnic", label: "⚙️ Polytechnic", color: "#f59e0b" },
    { value: "vocational", label: "🔧 Vocational", color: "#8b5cf6" }
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
    shape3: { width: "200px", height: "200px", top: "30%", right: "15%", animationDelay: "6s" },
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
    mainLayout: {
      display: "flex",
      minHeight: "100vh",
      position: "relative",
      zIndex: 1
    },
    contentArea: {
      flex: 1,
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    },
    header: {
      textAlign: "center",
      marginBottom: "2rem"
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
    profileCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(40px)",
      borderRadius: "25px",
      padding: "3rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)"
    },
    logoSection: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      paddingBottom: "2rem",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      marginBottom: "2rem"
    },
    logoContainer: {
      position: "relative",
      flexShrink: 0
    },
    logoPreview: {
      width: "140px",
      height: "140px",
      borderRadius: "20px",
      objectFit: "cover",
      border: "3px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)"
    },
    logoPlaceholder: {
      width: "140px",
      height: "140px",
      borderRadius: "20px",
      background: "linear-gradient(135deg, #4facfe20, #00f2fe40)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      color: "#4facfe",
      border: "3px dashed rgba(255, 255, 255, 0.2)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
    },
    logoUpload: {
      display: "inline-block",
      padding: "1rem 2rem",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      color: "white",
      borderRadius: "12px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.3s ease",
      boxShadow: "0 8px 25px rgba(79, 172, 254, 0.4)",
      border: "none"
    },
    formGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginBottom: "2rem"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    },
    label: {
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
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
    textarea: {
      width: "100%",
      minHeight: "120px",
      padding: "1.5rem",
      background: "rgba(255, 255, 255, 0.08)",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      color: "white",
      fontSize: "1rem",
      fontWeight: 500,
      transition: "all 0.3s ease",
      resize: "vertical"
    },
    typeGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "1rem",
      marginTop: "0.5rem"
    },
    typeButton: {
      padding: "1rem 1.5rem",
      background: "rgba(255, 255, 255, 0.05)",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      textAlign: "left"
    },
    actionButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "flex-end",
      marginTop: "2rem",
      paddingTop: "2rem",
      borderTop: "1px solid rgba(255, 255, 255, 0.1)"
    },
    primaryButton: {
      padding: "1.2rem 3rem",
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
      padding: "1.2rem 2rem",
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
    tipsSection: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    tipsTitle: {
      fontSize: "1.3rem",
      fontWeight: 700,
      marginBottom: "1.5rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    },
    tipsList: {
      display: "grid",
      gap: "1rem"
    },
    tipItem: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1rem",
      padding: "1rem",
      background: "rgba(255, 255, 255, 0.03)",
      borderRadius: "12px",
      border: "1px solid rgba(255, 255, 255, 0.05)"
    },
    tipIcon: {
      fontSize: "1.2rem",
      flexShrink: 0
    },
    tipText: {
      fontSize: "0.95rem",
      color: "rgba(255, 255, 255, 0.8)",
      lineHeight: 1.5,
      fontWeight: 500
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

        <div style={styles.mainLayout}>
          <Sidebar links={sidebarLinks} />
          <div style={styles.contentArea}>
            {/* Header Section */}
            <header style={styles.header}>
              <div style={styles.headerIcon}>🏛️</div>
              <h1 style={styles.title}>Institution Profile</h1>
              <p style={styles.subtitle}>
                Build your institution's digital presence with comprehensive profile management and branding
              </p>
            </header>

            {/* Main Profile Card */}
            <div style={styles.profileCard}>
              {/* Logo Section */}
              <div style={styles.logoSection}>
                <div style={styles.logoContainer}>
                  {profile.logo ? (
                    <img
                      src={profile.logo}
                      alt="Institution Logo"
                      style={styles.logoPreview}
                    />
                  ) : (
                    <div style={styles.logoPlaceholder}>
                      🏛️
                    </div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    fontSize: "1.5rem", 
                    fontWeight: 700, 
                    marginBottom: "0.5rem",
                    color: "white"
                  }}>
                    Brand Identity
                  </h3>
                  <p style={{ 
                    fontSize: "1rem", 
                    color: "rgba(255, 255, 255, 0.7)",
                    marginBottom: "1.5rem",
                    lineHeight: 1.6
                  }}>
                    Upload your institution's official logo. Recommended: 500×500px, PNG or JPG format, under 5MB.
                  </p>
                  <label
                    style={styles.logoUpload}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 12px 30px rgba(79, 172, 254, 0.6)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(79, 172, 254, 0.4)";
                    }}
                  >
                    📁 Upload Logo
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleLogoUpload} 
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div style={styles.formGrid}>
                {[
                  { 
                    label: "Institution Name", 
                    value: profile.name, 
                    onChange: (e) => setProfile(p => ({ ...p, name: e.target.value })),
                    icon: "🏛️",
                    type: "text",
                    placeholder: "Enter your institution's official name"
                  },
                  { 
                    label: "Email Address", 
                    value: profile.email, 
                    onChange: (e) => setProfile(p => ({ ...p, email: e.target.value })),
                    icon: "📧",
                    type: "email",
                    placeholder: "contact@institution.edu"
                  },
                  { 
                    label: "Phone Number", 
                    value: profile.phone, 
                    onChange: (e) => setProfile(p => ({ ...p, phone: e.target.value })),
                    icon: "📞",
                    type: "tel",
                    placeholder: "+1 (555) 123-4567"
                  },
                  { 
                    label: "Website", 
                    value: profile.website, 
                    onChange: (e) => setProfile(p => ({ ...p, website: e.target.value })),
                    icon: "🌐",
                    type: "url",
                    placeholder: "https://your-institution.edu"
                  },
                  { 
                    label: "Established Year", 
                    value: profile.established, 
                    onChange: (e) => setProfile(p => ({ ...p, established: e.target.value })),
                    icon: "📅",
                    type: "number",
                    placeholder: "1990"
                  }
                ].map((field, index) => (
                  <div key={index} style={styles.formGroup}>
                    <label style={styles.label}>
                      <span>{field.icon}</span>
                      {field.label}
                    </label>
                    <input
                      value={field.value}
                      onChange={field.onChange}
                      type={field.type}
                      placeholder={field.placeholder}
                      style={{
                        ...styles.input,
                        borderColor: activeField === field.label ? "#4facfe" : "rgba(255, 255, 255, 0.1)"
                      }}
                      onFocus={() => setActiveField(field.label)}
                      onBlur={() => setActiveField(null)}
                    />
                  </div>
                ))}

                {/* Institution Type */}
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    <span>🎯</span>
                    Institution Type
                  </label>
                  <div style={styles.typeGrid}>
                    {institutionTypes.map((type) => (
                      <button
                        key={type.value}
                        style={{
                          ...styles.typeButton,
                          background: profile.type === type.value 
                            ? `linear-gradient(135deg, ${type.color}20, ${type.color}10)`
                            : "rgba(255, 255, 255, 0.05)",
                          borderColor: profile.type === type.value ? type.color : "rgba(255, 255, 255, 0.1)",
                          color: profile.type === type.value ? "white" : "rgba(255, 255, 255, 0.7)",
                          transform: profile.type === type.value ? "scale(1.02)" : "scale(1)"
                        }}
                        onClick={() => setProfile(p => ({ ...p, type: type.value }))}
                      >
                        <span>{type.label.split(' ')[0]}</span>
                        {type.label.split(' ').slice(1).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Address Field */}
                <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
                  <label style={styles.label}>
                    <span>📍</span>
                    Campus Address
                  </label>
                  <input
                    value={profile.address}
                    onChange={(e) => setProfile(p => ({ ...p, address: e.target.value }))}
                    type="text"
                    placeholder="Enter your main campus address"
                    style={{
                      ...styles.input,
                      borderColor: activeField === "Address" ? "#4facfe" : "rgba(255, 255, 255, 0.1)"
                    }}
                    onFocus={() => setActiveField("Address")}
                    onBlur={() => setActiveField(null)}
                  />
                </div>

                {/* Description Field */}
                <div style={{ ...styles.formGroup, gridColumn: "1 / -1" }}>
                  <label style={styles.label}>
                    <span>📝</span>
                    Institution Description
                  </label>
                  <textarea
                    value={profile.description}
                    onChange={e => setProfile(p => ({ ...p, description: e.target.value }))}
                    placeholder="Describe your institution's mission, values, academic offerings, and unique features..."
                    style={{
                      ...styles.textarea,
                      borderColor: activeField === "Description" ? "#4facfe" : "rgba(255, 255, 255, 0.1)"
                    }}
                    onFocus={() => setActiveField("Description")}
                    onBlur={() => setActiveField(null)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={styles.actionButtons}>
                <button
                  style={styles.secondaryButton}
                  onMouseOver={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"}
                  onMouseOut={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                >
                  <span>🔄</span>
                  Reset Changes
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  style={{
                    ...styles.primaryButton,
                    opacity: isSaving ? 0.7 : 1,
                    cursor: isSaving ? "not-allowed" : "pointer"
                  }}
                  onMouseOver={(e) => !isSaving && (e.currentTarget.style.transform = "translateY(-2px)")}
                  onMouseOut={(e) => !isSaving && (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {isSaving ? (
                    <>
                      <span className="spinner">⏳</span>
                      Saving Profile...
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      Save Institution Profile
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tips Section */}
            <div style={styles.tipsSection}>
              <h3 style={styles.tipsTitle}>
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
                Profile Optimization Tips
              </h3>
              <div style={styles.tipsList}>
                {[
                  { icon: "🎯", text: "Use your official institution name for better recognition" },
                  { icon: "📸", text: "Upload a high-quality logo that represents your brand identity" },
                  { icon: "📖", text: "Write a compelling description highlighting your unique offerings" },
                  { icon: "🌐", text: "Keep contact information updated for student inquiries" },
                  { icon: "🎓", text: "Select the correct institution type for proper categorization" }
                ].map((tip, index) => (
                  <div key={index} style={styles.tipItem}>
                    <div style={styles.tipIcon}>{tip.icon}</div>
                    <div style={styles.tipText}>{tip.text}</div>
                  </div>
                ))}
              </div>
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