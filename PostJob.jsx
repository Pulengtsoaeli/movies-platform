import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function PostJob() {
  const { addJob, jobs } = useAppData();
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [jobType, setJobType] = useState("full-time");
  const [category, setCategory] = useState("technology");
  const [experience, setExperience] = useState("mid-level");
  const [isPosting, setIsPosting] = useState(false);
  const [activeField, setActiveField] = useState(null);

  const handlePost = async () => {
    if (!title.trim()) return alert("🎯 Please enter a job title");
    
    setIsPosting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addJob({
      id: `job_${Date.now()}`,
      title: title.trim(),
      requirements,
      location,
      salary,
      type: jobType,
      category,
      experience,
      companyId: user.id,
      companyName: user.name,
      status: "open",
      postedAt: new Date().toISOString(),
      applicants: 0,
      views: 0
    });
    
    setTitle("");
    setRequirements("");
    setLocation("");
    setSalary("");
    setJobType("full-time");
    setCategory("technology");
    setExperience("mid-level");
    setIsPosting(false);
  };

  const myJobs = jobs.filter(j => j.companyId === user.id);

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
      maxWidth: "1200px",
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
      gap: "1.5rem",
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
    formSelect: {
      padding: "1.25rem",
      borderRadius: "15px",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      fontSize: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.08)",
      cursor: "pointer",
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
      minHeight: "140px"
    },
    formRow: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "1rem"
    },
    postButton: {
      padding: "1.5rem 2rem",
      borderRadius: "15px",
      background: title.trim() ? 
        "linear-gradient(135deg, #4facfe, #00f2fe)" : 
        "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
      color: "white",
      border: "none",
      cursor: title.trim() && !isPosting ? "pointer" : "not-allowed",
      fontWeight: 700,
      fontSize: "1.1rem",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      boxShadow: title.trim() ? "0 4px 20px rgba(79, 172, 254, 0.4)" : "none",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      justifyContent: "center",
      marginTop: "1rem",
      opacity: isPosting ? 0.7 : 1
    },
    jobsCard: {
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      borderRadius: "25px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "2.5rem",
      height: "fit-content"
    },
    jobsTitle: {
      fontSize: "1.8rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "2rem",
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    emptyState: {
      textAlign: "center",
      padding: "3rem 2rem",
      color: "rgba(255, 255, 255, 0.7)"
    },
    emptyIcon: {
      fontSize: "4rem",
      marginBottom: "1.5rem",
      opacity: 0.5
    },
    emptyText: {
      fontSize: "1.1rem",
      fontWeight: 500,
      lineHeight: 1.6
    },
    jobsList: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem"
    },
    jobItem: {
      background: "rgba(255, 255, 255, 0.05)",
      padding: "1.5rem",
      borderRadius: "18px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      backdropFilter: "blur(10px)"
    },
    jobHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "0.75rem"
    },
    jobTitle: {
      fontSize: "1.2rem",
      fontWeight: 700,
      color: "white",
      margin: 0,
      textShadow: "0 2px 4px rgba(0,0,0,0.3)"
    },
    jobStatus: {
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      fontSize: "0.8rem",
      fontWeight: 700,
      textTransform: "capitalize"
    },
    jobMeta: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500,
      display: "flex",
      gap: "1rem",
      flexWrap: "wrap"
    },
    jobStats: {
      display: "flex",
      gap: "1rem",
      marginTop: "0.75rem",
      fontSize: "0.8rem",
      color: "rgba(255, 255, 255, 0.6)"
    },
    infoFooter: {
      background: "rgba(255, 255, 255, 0.08)",
      padding: "2rem",
      borderRadius: "20px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
      textAlign: "center"
    },
    infoText: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.8)",
      fontWeight: 500,
      margin: 0,
      lineHeight: 1.6
    }
  };

  const jobCategories = [
    { value: "technology", label: "Technology", icon: "💻" },
    { value: "healthcare", label: "Healthcare", icon: "🏥" },
    { value: "education", label: "Education", icon: "🎓" },
    { value: "finance", label: "Finance", icon: "💰" },
    { value: "marketing", label: "Marketing", icon: "📊" },
    { value: "design", label: "Design", icon: "🎨" }
  ];

  const experienceLevels = [
    { value: "internship", label: "Internship", icon: "🎯" },
    { value: "entry-level", label: "Entry Level", icon: "🆕" },
    { value: "mid-level", label: "Mid Level", icon: "⚡" },
    { value: "senior", label: "Senior", icon: "👑" },
    { value: "lead", label: "Lead", icon: "🚀" }
  ];

  const jobTypes = [
    { value: "full-time", label: "Full Time", icon: "💼" },
    { value: "part-time", label: "Part Time", icon: "⏰" },
    { value: "contract", label: "Contract", icon: "📝" },
    { value: "internship", label: "Internship", icon: "🎓" },
    { value: "remote", label: "Remote", icon: "🌍" }
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
            <div style={styles.headerIcon}>💼</div>
            <h1 style={styles.headerTitle}>Create Job Opportunity</h1>
            <p style={styles.headerSubtitle}>
              Craft compelling job postings that attract top talent. Be specific about requirements 
              and showcase your company culture to find the perfect candidates.
            </p>
          </div>

          <div style={styles.mainGrid}>
            {/* Post Job Form */}
            <div style={styles.formCard}>
              <h3 style={styles.formTitle}>
                <span>🚀</span> Job Details
              </h3>

              <div style={styles.formGrid}>
                {/* Job Title */}
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <span>🎯</span> Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Senior Frontend Developer"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    style={{
                      ...styles.formInput,
                      borderColor: activeField === 'title' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                      background: activeField === 'title' 
                        ? 'rgba(255, 255, 255, 0.12)' 
                        : 'rgba(255, 255, 255, 0.08)'
                    }}
                    onFocus={() => setActiveField('title')}
                    onBlur={() => setActiveField(null)}
                  />
                </div>

                {/* Job Type and Category */}
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <span>💼</span> Job Type
                    </label>
                    <select
                      value={jobType}
                      onChange={e => setJobType(e.target.value)}
                      style={{
                        ...styles.formSelect,
                        borderColor: activeField === 'jobType' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                        background: activeField === 'jobType' 
                          ? 'rgba(255, 255, 255, 0.12)' 
                          : 'rgba(255, 255, 255, 0.08)'
                      }}
                      onFocus={() => setActiveField('jobType')}
                      onBlur={() => setActiveField(null)}
                    >
                      {jobTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.icon} {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <span>📁</span> Category
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      style={{
                        ...styles.formSelect,
                        borderColor: activeField === 'category' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                        background: activeField === 'category' 
                          ? 'rgba(255, 255, 255, 0.12)' 
                          : 'rgba(255, 255, 255, 0.08)'
                      }}
                      onFocus={() => setActiveField('category')}
                      onBlur={() => setActiveField(null)}
                    >
                      {jobCategories.map(cat => (
                        <option key={cat.value} value={cat.value}>
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location and Experience */}
                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <span>📍</span> Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Maseru, Lesotho"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      style={{
                        ...styles.formInput,
                        borderColor: activeField === 'location' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                        background: activeField === 'location' 
                          ? 'rgba(255, 255, 255, 0.12)' 
                          : 'rgba(255, 255, 255, 0.08)'
                      }}
                      onFocus={() => setActiveField('location')}
                      onBlur={() => setActiveField(null)}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                      <span>⚡</span> Experience Level
                    </label>
                    <select
                      value={experience}
                      onChange={e => setExperience(e.target.value)}
                      style={{
                        ...styles.formSelect,
                        borderColor: activeField === 'experience' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                        background: activeField === 'experience' 
                          ? 'rgba(255, 255, 255, 0.12)' 
                          : 'rgba(255, 255, 255, 0.08)'
                      }}
                      onFocus={() => setActiveField('experience')}
                      onBlur={() => setActiveField(null)}
                    >
                      {experienceLevels.map(level => (
                        <option key={level.value} value={level.value}>
                          {level.icon} {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Salary */}
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <span>💰</span> Salary Range
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., M15,000 - M20,000 per month"
                    value={salary}
                    onChange={e => setSalary(e.target.value)}
                    style={{
                      ...styles.formInput,
                      borderColor: activeField === 'salary' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                      background: activeField === 'salary' 
                        ? 'rgba(255, 255, 255, 0.12)' 
                        : 'rgba(255, 255, 255, 0.08)'
                    }}
                    onFocus={() => setActiveField('salary')}
                    onBlur={() => setActiveField(null)}
                  />
                </div>

                {/* Requirements */}
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>
                    <span>📋</span> Job Requirements & Description
                  </label>
                  <textarea
                    placeholder="Describe the skills, qualifications, experience required, and what makes this role exciting..."
                    value={requirements}
                    onChange={e => setRequirements(e.target.value)}
                    style={{
                      ...styles.textarea,
                      borderColor: activeField === 'requirements' ? '#4facfe' : 'rgba(255, 255, 255, 0.1)',
                      background: activeField === 'requirements' 
                        ? 'rgba(255, 255, 255, 0.12)' 
                        : 'rgba(255, 255, 255, 0.08)'
                    }}
                    onFocus={() => setActiveField('requirements')}
                    onBlur={() => setActiveField(null)}
                  />
                </div>

                {/* Post Button */}
                <button
                  onClick={handlePost}
                  disabled={!title.trim() || isPosting}
                  style={styles.postButton}
                  onMouseOver={e => title.trim() && !isPosting && (e.currentTarget.style.transform = "translateY(-3px)")}
                  onMouseOut={e => title.trim() && !isPosting && (e.currentTarget.style.transform = "translateY(0)")}
                >
                  {isPosting ? (
                    <>
                      <span className="loading-spinner"></span>
                      Publishing Job...
                    </>
                  ) : (
                    <>
                      <span>🚀</span>
                      Publish Job Opportunity
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Posted Jobs List */}
            <div style={styles.jobsCard}>
              <h3 style={styles.jobsTitle}>
                <span>📊</span> Active Job Postings
              </h3>

              {myJobs.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>💼</div>
                  <p style={styles.emptyText}>
                    No active job postings yet. <br />
                    Create your first opportunity to attract talented candidates!
                  </p>
                </div>
              ) : (
                <div style={styles.jobsList}>
                  {myJobs.map(job => (
                    <div
                      key={job.id}
                      style={styles.jobItem}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      }}
                    >
                      <div style={styles.jobHeader}>
                        <h4 style={styles.jobTitle}>{job.title}</h4>
                        <span style={{
                          ...styles.jobStatus,
                          background: job.status === "open" 
                            ? "rgba(16, 185, 129, 0.2)" 
                            : "rgba(245, 158, 11, 0.2)",
                          color: job.status === "open" ? "#10b981" : "#f59e0b",
                          border: `1px solid ${job.status === "open" ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`
                        }}>
                          {job.status}
                        </span>
                      </div>
                      <div style={styles.jobMeta}>
                        <span>{jobTypes.find(t => t.value === job.type)?.icon} {job.type}</span>
                        <span>{jobCategories.find(c => c.value === job.category)?.icon} {job.category}</span>
                        <span>{job.location || "Remote"}</span>
                      </div>
                      <div style={styles.jobStats}>
                        <span>👤 {job.applicants || 0} applicants</span>
                        <span>👁️ {job.views || 0} views</span>
                        <span>📅 {new Date(job.postedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info Footer */}
          <div style={styles.infoFooter}>
            <p style={styles.infoText}>
              💡 <strong>Pro Tip:</strong> Use specific keywords in your job title and requirements. 
              Detailed postings receive 3x more qualified applications and attract better-matched candidates.
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