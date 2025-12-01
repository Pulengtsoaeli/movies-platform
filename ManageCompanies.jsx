import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";

export default function ManageCompanies() {
  const { companies, addCompany, updateCompany, deleteCompany } = useAppData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activeField, setActiveField] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    if (!name.trim()) return alert("🎯 Please enter company name");
    
    setIsAdding(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    addCompany({
      id: `comp_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      industry: industry.trim(),
      website: website.trim(),
      status: "pending",
      createdAt: new Date().toISOString(),
      jobs: 0,
      employees: "1-50"
    });
    
    setName("");
    setEmail("");
    setIndustry("");
    setWebsite("");
    setIsAdding(false);
  };

  const approvedCompanies = companies.filter(c => c.status === "approved");
  const suspendedCompanies = companies.filter(c => c.status === "suspended");
  const pendingCompanies = companies.filter(c => c.status === "pending");

  const filteredCompanies = activeTab === "all" 
    ? companies 
    : companies.filter(c => c.status === activeTab);

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
      backdropFilter: "blur(10px)"
    },
    submitButton: {
      padding: "1.25rem 2rem",
      borderRadius: "15px",
      background: name.trim() ? 
        "linear-gradient(135deg, #4facfe, #00f2fe)" : 
        "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      color: "white",
      border: "none",
      cursor: name.trim() && !isAdding ? "pointer" : "not-allowed",
      fontWeight: 700,
      fontSize: "1.1rem",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: name.trim() ? "0 4px 20px rgba(79, 172, 254, 0.4)" : "none",
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
    companiesCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "2.5rem",
      gridColumn: "1 / -1"
    },
    companiesHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "2rem"
    },
    companiesTitle: {
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
    companiesGrid: {
      display: "grid",
      gap: "1rem"
    },
    companyCard: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "2rem",
      borderRadius: "18px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      backdropFilter: "blur(10px)"
    },
    companyHeader: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: "1rem"
    },
    companyInfo: {
      flex: 1
    },
    companyName: {
      fontSize: "1.3rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "0.5rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    companyMeta: {
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
    }
  };

  const tabs = [
    { key: "all", label: "All Companies", icon: "🏢", count: companies.length },
    { key: "approved", label: "Approved", icon: "✅", count: approvedCompanies.length },
    { key: "pending", label: "Pending", icon: "⏳", count: pendingCompanies.length },
    { key: "suspended", label: "Suspended", icon: "⏸️", count: suspendedCompanies.length }
  ];

  const formFields = [
    { 
      label: "Company Name", 
      value: name, 
      onChange: (e) => setName(e.target.value),
      placeholder: "Enter company name",
      icon: "🏢"
    },
    { 
      label: "Email Address", 
      value: email, 
      onChange: (e) => setEmail(e.target.value),
      placeholder: "company@email.com",
      icon: "📧"
    },
    { 
      label: "Industry", 
      value: industry, 
      onChange: (e) => setIndustry(e.target.value),
      placeholder: "e.g., Technology, Healthcare",
      icon: "🏭"
    },
    { 
      label: "Website", 
      value: website, 
      onChange: (e) => setWebsite(e.target.value),
      placeholder: "https://company.com",
      icon: "🌐"
    }
  ];

  const stats = [
    { label: "Total Companies", value: companies.length, icon: "🏢", color: "#4facfe" },
    { label: "Approved", value: approvedCompanies.length, icon: "✅", color: "#10b981" },
    { label: "Pending Review", value: pendingCompanies.length, icon: "⏳", color: "#6b7280" },
    { label: "Suspended", value: suspendedCompanies.length, icon: "⏸️", color: "#f59e0b" }
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
          <div style={styles.header}>
            <div style={styles.headerIcon}>🏢</div>
            <h1 style={styles.headerTitle}>Company Management</h1>
            <p style={styles.headerSubtitle}>
              Oversee company registrations, manage platform access, and monitor partnership activities
            </p>
          </div>

          <div style={styles.mainGrid}>
            {/* Add Company Form */}
            <div style={styles.formCard}>
              <h3 style={styles.formTitle}>
                <span>🚀</span> Register New Company
              </h3>

              <div style={styles.formGrid}>
                {formFields.map((field, index) => (
                  <div key={index} style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <span>{field.icon}</span> {field.label}
                    </label>
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
                  </div>
                ))}

                <button
                  onClick={handleAdd}
                  disabled={!name.trim() || isAdding}
                  style={{
                    ...styles.submitButton,
                    transform: activeField === 'submit' ? 'translateY(-3px)' : 'translateY(0)',
                    boxShadow: activeField === 'submit' 
                      ? '0 8px 30px rgba(79, 172, 254, 0.6)' 
                      : '0 4px 20px rgba(79, 172, 254, 0.4)'
                  }}
                  onMouseEnter={() => setActiveField('submit')}
                  onMouseLeave={() => setActiveField(null)}
                >
                  {isAdding ? (
                    <>
                      <span className="loading-spinner"></span>
                      Registering Company...
                    </>
                  ) : (
                    <>
                      <span>🎯</span>
                      Register Company
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Statistics Card */}
            <div style={styles.statsCard}>
              <h3 style={styles.statsTitle}>
                <span>📊</span> Partnership Overview
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

            {/* Companies List */}
            <div style={styles.companiesCard}>
              <div style={styles.companiesHeader}>
                <h3 style={styles.companiesTitle}>
                  <span>📋</span> Registered Companies
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

              {filteredCompanies.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>
                    {activeTab === "all" ? "🏢" : 
                     activeTab === "approved" ? "✅" :
                     activeTab === "pending" ? "⏳" : "⏸️"}
                  </div>
                  <h3 style={styles.emptyTitle}>
                    {activeTab === "all" ? "No Companies Registered" : 
                     activeTab === "approved" ? "No Approved Companies" :
                     activeTab === "pending" ? "No Pending Reviews" : "No Suspended Companies"}
                  </h3>
                  <p style={styles.emptyText}>
                    {activeTab === "all" 
                      ? "Start by registering a new company using the form above"
                      : `No companies found with ${activeTab} status`}
                  </p>
                </div>
              ) : (
                <div style={styles.companiesGrid}>
                  {filteredCompanies.map((company) => {
                    const statusConfig = getStatusConfig(company.status);
                    
                    return (
                      <div
                        key={company.id}
                        style={styles.companyCard}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                          e.currentTarget.style.transform = "translateY(-3px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                          e.currentTarget.style.transform = "translateY(0)";
                        }}
                      >
                        <div style={styles.companyHeader}>
                          <div style={styles.companyInfo}>
                            <h4 style={styles.companyName}>{company.name}</h4>
                            <div style={styles.companyMeta}>
                              <div style={styles.metaItem}>
                                <span>📧</span>
                                {company.email}
                              </div>
                              {company.industry && (
                                <div style={styles.metaItem}>
                                  <span>🏭</span>
                                  {company.industry}
                                </div>
                              )}
                              {company.website && (
                                <div style={styles.metaItem}>
                                  <span>🌐</span>
                                  {company.website}
                                </div>
                              )}
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
                            onClick={() => updateCompany(company.id, { status: "approved" })}
                            style={{
                              ...styles.actionButton,
                              background: "linear-gradient(135deg, #10b981, #34d399)",
                              color: "white"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                          >
                            ✅ Approve Access
                          </button>
                          <button
                            onClick={() => updateCompany(company.id, { status: "suspended" })}
                            style={{
                              ...styles.actionButton,
                              background: "linear-gradient(135deg, #f59e0b, #fbbf24)",
                              color: "white"
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                          >
                            ⏸️ Suspend Account
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`🚨 Are you sure you want to permanently delete ${company.name}?`)) {
                                deleteCompany(company.id);
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
                            🗑️ Remove
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