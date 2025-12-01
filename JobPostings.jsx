import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function JobPostings() {
  const { jobs, applyForJob } = useAppData();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [animatedCount, setAnimatedCount] = useState(0);

  const categories = [
    { key: "all", label: "All Roles", icon: "🌟", color: "#4facfe" },
    { key: "technology", label: "Technology", icon: "💻", color: "#8b5cf6" },
    { key: "business", label: "Business", icon: "📊", color: "#10b981" },
    { key: "design", label: "Design", icon: "🎨", color: "#f59e0b" },
    { key: "marketing", label: "Marketing", icon: "📈", color: "#ec4899" }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    // Animate job count
    let currentCount = 0;
    const targetCount = filteredJobs.length;
    const duration = 1000;
    const increment = targetCount / (duration / 16);
    
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= targetCount) {
        setAnimatedCount(targetCount);
        clearInterval(timer);
      } else {
        setAnimatedCount(Math.floor(currentCount));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [filteredJobs.length]);

  const getJobTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case "full-time": return "#10b981";
      case "part-time": return "#f59e0b";
      case "contract": return "#8b5cf6";
      case "internship": return "#ec4899";
      default: return "#64748b";
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
    floatingElement: {
      position: "absolute",
      borderRadius: "50%",
      background: "linear-gradient(135deg, rgba(79, 172, 254, 0.1) 0%, rgba(0, 242, 254, 0.05) 100%)",
      animation: "float 8s ease-in-out infinite"
    },
    element1: { width: "400px", height: "400px", top: "-150px", right: "-100px", animationDelay: "0s" },
    element2: { width: "300px", height: "300px", bottom: "-120px", left: "-80px", animationDelay: "3s" },
    element3: { width: "200px", height: "200px", top: "30%", left: "10%", animationDelay: "6s" },
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
      maxWidth: "1200px",
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
    searchSection: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
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
    categoryFilter: {
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap",
      justifyContent: "center"
    },
    categoryButton: {
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
      gap: "0.5rem"
    },
    resultsHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem"
    },
    resultsCount: {
      fontSize: "1.2rem",
      fontWeight: 700,
      color: "white"
    },
    jobsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
      gap: "2rem",
      marginBottom: "3rem"
    },
    jobCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    jobHeader: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1.5rem",
      marginBottom: "1.5rem"
    },
    jobIcon: {
      width: "70px",
      height: "70px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2rem",
      boxShadow: "0 8px 20px rgba(79, 172, 254, 0.3)",
      flexShrink: 0
    },
    jobTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
      color: "white",
      lineHeight: 1.3
    },
    companyInfo: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      fontSize: "1.1rem",
      color: "#4facfe",
      fontWeight: 600
    },
    jobDescription: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.8)",
      lineHeight: 1.6,
      marginBottom: "2rem",
      fontWeight: 500
    },
    jobMeta: {
      display: "flex",
      flexWrap: "wrap",
      gap: "1rem",
      marginBottom: "2rem"
    },
    metaTag: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.75rem 1rem",
      borderRadius: "10px",
      fontSize: "0.9rem",
      fontWeight: 600,
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    applyButton: {
      width: "100%",
      padding: "1.2rem 2rem",
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
      justifyContent: "center",
      gap: "0.75rem"
    },
    emptyState: {
      textAlign: "center",
      padding: "4rem 2rem",
      background: "rgba(255, 255, 255, 0.05)",
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
    footer: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center"
    },
    footerText: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500,
      margin: 0
    }
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        {/* Animated Background */}
        <div style={styles.background}>
          <div style={{...styles.floatingElement, ...styles.element1}}></div>
          <div style={{...styles.floatingElement, ...styles.element2}}></div>
          <div style={{...styles.floatingElement, ...styles.element3}}></div>
          <div style={styles.gridPattern}></div>
        </div>

        <div style={styles.content}>
          {/* Header Section */}
          <header style={styles.header}>
            <div style={styles.headerIcon}>💼</div>
            <h1 style={styles.title}>Career Launchpad</h1>
            <p style={styles.subtitle}>
              Discover your next professional adventure with handpicked opportunities from top companies
            </p>
          </header>

          {/* Search & Filter Section */}
          <div style={styles.searchSection}>
            <div style={styles.searchContainer}>
              <input
                type="text"
                placeholder="🔍 Search jobs, companies, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  ...styles.searchInput,
                  borderColor: searchTerm ? "#4facfe" : "rgba(255, 255, 255, 0.1)"
                }}
              />
            </div>
            
            <div style={styles.categoryFilter}>
              {categories.map((category) => (
                <button
                  key={category.key}
                  style={{
                    ...styles.categoryButton,
                    background: selectedCategory === category.key 
                      ? `linear-gradient(135deg, ${category.color}, ${category.color}80)`
                      : "rgba(255, 255, 255, 0.05)",
                    borderColor: selectedCategory === category.key ? category.color : "rgba(255, 255, 255, 0.1)",
                    color: selectedCategory === category.key ? "white" : "rgba(255, 255, 255, 0.7)",
                    transform: selectedCategory === category.key ? "scale(1.05)" : "scale(1)"
                  }}
                  onClick={() => setSelectedCategory(category.key)}
                >
                  <span>{category.icon}</span>
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Header */}
          <div style={styles.resultsHeader}>
            <div style={styles.resultsCount}>
              🎯 Found {animatedCount} Opportunity{animatedCount !== 1 ? 'ies' : ''}
            </div>
          </div>

          {/* Jobs Grid */}
          <div style={styles.jobsGrid}>
            {filteredJobs.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>
                  {searchTerm || selectedCategory !== "all" ? "🔍" : "📭"}
                </div>
                <h3 style={styles.emptyTitle}>
                  {searchTerm || selectedCategory !== "all" 
                    ? "No Matching Opportunities" 
                    : "No Jobs Available"}
                </h3>
                <p style={styles.emptyText}>
                  {searchTerm || selectedCategory !== "all"
                    ? "Try adjusting your search criteria or browse all categories"
                    : "We're constantly adding new opportunities. Check back soon for exciting career openings!"}
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    ...styles.jobCard,
                    background: `linear-gradient(135deg, ${getJobTypeColor(job.type)}10, ${getJobTypeColor(job.type)}05)`,
                    borderColor: `${getJobTypeColor(job.type)}30`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px) scale(1.02)";
                    e.currentTarget.style.background = `linear-gradient(135deg, ${getJobTypeColor(job.type)}15, ${getJobTypeColor(job.type)}08)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                    e.currentTarget.style.background = `linear-gradient(135deg, ${getJobTypeColor(job.type)}10, ${getJobTypeColor(job.type)}05)`;
                  }}
                >
                  <div style={styles.jobHeader}>
                    <div style={styles.jobIcon}>
                      {job.category === "technology" ? "💻" : 
                       job.category === "business" ? "📊" :
                       job.category === "design" ? "🎨" :
                       job.category === "marketing" ? "📈" : "💼"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={styles.jobTitle}>{job.title}</h3>
                      <div style={styles.companyInfo}>
                        <span>🏢</span>
                        {job.company}
                      </div>
                    </div>
                  </div>

                  {job.description && (
                    <p style={styles.jobDescription}>{job.description}</p>
                  )}

                  <div style={styles.jobMeta}>
                    {job.location && (
                      <div style={styles.metaTag}>
                        <span>📍</span>
                        {job.location}
                      </div>
                    )}
                    {job.salary && (
                      <div style={{
                        ...styles.metaTag,
                        background: "rgba(74, 222, 128, 0.1)",
                        borderColor: "rgba(74, 222, 128, 0.3)"
                      }}>
                        <span>💰</span>
                        {job.salary}
                      </div>
                    )}
                    {job.type && (
                      <div style={{
                        ...styles.metaTag,
                        background: `rgba(${parseInt(getJobTypeColor(job.type).slice(1, 3), 16)}, ${parseInt(getJobTypeColor(job.type).slice(3, 5), 16)}, ${parseInt(getJobTypeColor(job.type).slice(5, 7), 16)}, 0.1)`,
                        borderColor: `${getJobTypeColor(job.type)}30`
                      }}>
                        <span>⏱️</span>
                        {job.type}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      applyForJob(user.id, job);
                      alert("🎉 Application submitted! We'll be in touch soon.");
                    }}
                    style={{
                      ...styles.applyButton,
                      background: `linear-gradient(135deg, ${getJobTypeColor(job.type)}, ${getJobTypeColor(job.type)}80)`,
                      boxShadow: `0 8px 25px ${getJobTypeColor(job.type)}40`
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = `0 12px 30px ${getJobTypeColor(job.type)}60`;
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = `0 8px 25px ${getJobTypeColor(job.type)}40`;
                    }}
                  >
                    <span>🚀</span>
                    Apply Now
                    <span>✨</span>
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div style={styles.footer}>
            <p style={styles.footerText}>
              💼 {jobs.length} total opportunities • 🔍 Updated daily • ⚡ Instant apply • 🌟 Top companies
            </p>
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
      `}</style>
    </>
  );
}