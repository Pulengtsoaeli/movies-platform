import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/ApplicationContext";

export default function CompanyProfile() {
  const { user, updateUser } = useAuth();
  const { updateCompanyProfile } = useAppData();

  const links = [
    { to: "/company/post-job", label: "Post Job", icon: "🚀" },
    { to: "/company/applicants", label: "View Applicants", icon: "👥" },
    { to: "/company/profile", label: "Update Profile", icon: "🏢" },
    { to: "/company/settings", label: "Settings", icon: "⚙️" },
  ];

  const [form, setForm] = useState({
    companyName: user.companyName || "",
    email: user.email || "",
    industry: user.industry || "",
    phone: user.phone || "",
    address: user.address || "",
    description: user.description || "",
    logo: user.logo || "",
    website: user.website || "",
    founded: user.founded || "",
    size: user.size || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({ ...prev, logo: URL.createObjectURL(files[0]) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    updateCompanyProfile(user.id, form);
    updateUser({ ...user, ...form });
    setIsSaving(false);
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
    formCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "3rem",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginBottom: "2rem"
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
      position: "relative"
    },
    logoPreview: {
      width: "140px",
      height: "140px",
      borderRadius: "25px",
      objectFit: "cover",
      border: "3px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)"
    },
    logoPlaceholder: {
      width: "140px",
      height: "140px",
      borderRadius: "25px",
      background: "linear-gradient(135deg, rgba(79, 172, 254, 0.3), rgba(0, 242, 254, 0.2))",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "3rem",
      color: "rgba(255, 255, 255, 0.8)",
      border: "3px dashed rgba(255, 255, 255, 0.3)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)"
    },
    logoContent: {
      flex: 1
    },
    logoTitle: {
      fontSize: "1.5rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "0.5rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    logoDescription: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.7)",
      marginBottom: "1.5rem",
      lineHeight: 1.5
    },
    uploadButton: {
      display: "inline-block",
      padding: "1rem 2rem",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      color: "white",
      borderRadius: "15px",
      fontWeight: 700,
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 4px 20px rgba(79, 172, 254, 0.4)",
      border: "none",
      fontSize: "1rem"
    },
    formGrid: {
      display: "grid",
      gap: "1.5rem"
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1.5rem"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem"
    },
    formLabel: {
      fontWeight: 700,
      color: "white",
      fontSize: "1rem",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    formInput: {
      padding: "1.25rem",
      borderRadius: "15px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      fontSize: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: 500,
      color: "white",
      backdropFilter: "blur(10px)"
    },
    textarea: {
      padding: "1.25rem",
      borderRadius: "15px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      fontSize: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      resize: "vertical",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontWeight: 500,
      color: "white",
      backdropFilter: "blur(10px)",
      minHeight: "120px"
    },
    saveButton: {
      padding: "1.25rem 3rem",
      borderRadius: "15px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      color: "white",
      fontWeight: 700,
      fontSize: "1.1rem",
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: "0 4px 20px rgba(79, 172, 254, 0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.75rem",
      marginTop: "1rem",
      width: "100%",
      maxWidth: "300px"
    },
    tipsCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "2.5rem",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    tipsHeader: {
      display: "flex",
      alignItems: "center",
      gap: "1.25rem",
      marginBottom: "1.5rem"
    },
    tipsIcon: {
      width: "60px",
      height: "60px",
      background: "linear-gradient(135deg, #a78bfa, #c4b5fd)",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      boxShadow: "0 8px 25px rgba(167, 139, 250, 0.4)"
    },
    tipsTitle: {
      fontSize: "1.5rem",
      fontWeight: 800,
      color: "white",
      margin: 0,
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    tipsList: {
      color: "rgba(255, 255, 255, 0.8)",
      fontSize: "1rem",
      fontWeight: 500,
      lineHeight: 1.6,
      margin: 0,
      paddingLeft: "1.5rem"
    },
    tipItem: {
      marginBottom: "0.75rem",
      position: "relative"
    }
  };

  const formFields = [
    [
      { 
        label: "Company Name", 
        name: "companyName", 
        value: form.companyName, 
        icon: "🏢",
        type: "text",
        placeholder: "Enter your company name"
      },
      { 
        label: "Email Address", 
        name: "email", 
        value: form.email, 
        icon: "📧",
        type: "email",
        placeholder: "company@example.com"
      }
    ],
    [
      { 
        label: "Industry", 
        name: "industry", 
        value: form.industry, 
        icon: "🏭",
        type: "text",
        placeholder: "e.g., Technology, Healthcare"
      },
      { 
        label: "Company Size", 
        name: "size", 
        value: form.size, 
        icon: "👥",
        type: "text",
        placeholder: "e.g., 50-100 employees"
      }
    ],
    [
      { 
        label: "Contact Number", 
        name: "phone", 
        value: form.phone, 
        icon: "📞",
        type: "tel",
        placeholder: "+266 1234 5678"
      },
      { 
        label: "Year Founded", 
        name: "founded", 
        value: form.founded, 
        icon: "📅",
        type: "text",
        placeholder: "e.g., 2020"
      }
    ],
    [
      { 
        label: "Website", 
        name: "website", 
        value: form.website, 
        icon: "🌐",
        type: "url",
        placeholder: "https://company.co.ls"
      },
      { 
        label: "Address", 
        name: "address", 
        value: form.address, 
        icon: "📍",
        type: "text",
        placeholder: "Company headquarters location"
      }
    ]
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
              <div style={styles.headerIcon}>🏢</div>
              <h1 style={styles.headerTitle}>Company Branding</h1>
              <p style={styles.headerSubtitle}>
                Craft your company's digital identity. Showcase your culture, values, and mission 
                to attract the perfect talent for your organization.
              </p>
            </div>

            {/* Profile Form Card */}
            <div style={styles.formCard}>
              {/* Logo Section */}
              <div style={styles.logoSection}>
                <div style={styles.logoContainer}>
                  {form.logo ? (
                    <img
                      src={form.logo}
                      alt="Company Logo"
                      style={styles.logoPreview}
                    />
                  ) : (
                    <div style={styles.logoPlaceholder}>
                      🏢
                    </div>
                  )}
                </div>
                <div style={styles.logoContent}>
                  <h3 style={styles.logoTitle}>Brand Identity</h3>
                  <p style={styles.logoDescription}>
                    Upload your company logo to establish brand recognition. 
                    Recommended size: 400x400px, PNG or JPG format.
                  </p>
                  <label
                    style={{
                      ...styles.uploadButton,
                      transform: activeField === 'logo' ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: activeField === 'logo' 
                        ? '0 8px 30px rgba(79, 172, 254, 0.6)' 
                        : '0 4px 20px rgba(79, 172, 254, 0.4)'
                    }}
                    onMouseEnter={() => setActiveField('logo')}
                    onMouseLeave={() => setActiveField(null)}
                  >
                    📁 Upload Logo
                    <input 
                      type="file" 
                      name="logo"
                      accept="image/*"
                      onChange={handleChange} 
                      style={{ display: "none" }}
                    />
                  </label>
                </div>
              </div>

              {/* Form Fields */}
              <div style={styles.formGrid}>
                {formFields.map((row, rowIndex) => (
                  <div key={rowIndex} style={styles.formRow}>
                    {row.map((field, fieldIndex) => (
                      <div key={field.name} style={styles.formGroup}>
                        <label style={styles.formLabel}>
                          <span>{field.icon}</span> {field.label}
                        </label>
                        <input
                          name={field.name}
                          type={field.type}
                          value={field.value}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          style={{
                            ...styles.formInput,
                            borderColor: activeField === field.name 
                              ? '#4facfe' 
                              : 'rgba(255, 255, 255, 0.1)',
                            background: activeField === field.name
                              ? 'rgba(255, 255, 255, 0.12)'
                              : 'rgba(255, 255, 255, 0.08)',
                            boxShadow: activeField === field.name
                              ? '0 0 20px rgba(79, 172, 254, 0.3)'
                              : 'none'
                          }}
                          onFocus={() => setActiveField(field.name)}
                          onBlur={() => setActiveField(null)}
                        />
                      </div>
                    ))}
                  </div>
                ))}

                {/* Description Field */}
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <span>📝</span> Company Story & Mission
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleChange}
                    style={{
                      ...styles.textarea,
                      borderColor: activeField === 'description' 
                        ? '#4facfe' 
                        : 'rgba(255, 255, 255, 0.1)',
                      background: activeField === 'description'
                        ? 'rgba(255, 255, 255, 0.12)'
                        : 'rgba(255, 255, 255, 0.08)',
                      boxShadow: activeField === 'description'
                        ? '0 0 20px rgba(79, 172, 254, 0.3)'
                        : 'none'
                    }}
                    onFocus={() => setActiveField('description')}
                    onBlur={() => setActiveField(null)}
                    placeholder="Share your company's mission, values, culture, and what makes you unique to attract like-minded talent..."
                  />
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  style={{
                    ...styles.saveButton,
                    transform: activeField === 'save' ? 'translateY(-3px)' : 'translateY(0)',
                    boxShadow: activeField === 'save' 
                      ? '0 8px 30px rgba(79, 172, 254, 0.6)' 
                      : '0 4px 20px rgba(79, 172, 254, 0.4)',
                    opacity: isSaving ? 0.7 : 1
                  }}
                  onMouseEnter={() => setActiveField('save')}
                  onMouseLeave={() => setActiveField(null)}
                >
                  {isSaving ? (
                    <>
                      <span className="loading-spinner"></span>
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <span>💾</span>
                      Save Company Profile
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tips Card */}
            <div style={styles.tipsCard}>
              <div style={styles.tipsHeader}>
                <div style={styles.tipsIcon}>💡</div>
                <h3 style={styles.tipsTitle}>Branding Excellence Tips</h3>
              </div>
              <ul style={styles.tipsList}>
                <li style={styles.tipItem}>
                  <strong>Authentic Storytelling:</strong> Share your genuine mission and values to attract talent that aligns with your culture
                </li>
                <li style={styles.tipItem}>
                  <strong>Visual Consistency:</strong> Use high-quality logos and images that represent your brand across all platforms
                </li>
                <li style={styles.tipItem}>
                  <strong>Complete Information:</strong> Detailed company profiles receive 3x more quality applications
                </li>
                <li style={styles.tipItem}>
                  <strong>Regular Updates:</strong> Keep your profile current to maintain candidate trust and engagement
                </li>
              </ul>
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