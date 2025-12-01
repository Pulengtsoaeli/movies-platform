import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useAppData } from "../../context/ApplicationContext";

export default function Transcripts() {
  const { user } = useAuth();
  const { transcripts, uploadTranscript, deleteTranscript } = useAppData();
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const myTranscripts = transcripts.filter((t) => t.studentId === user.id);

  const documentTypes = [
    { key: "all", label: "All Documents", icon: "📚", color: "#4facfe" },
    { key: "transcript", label: "Transcripts", icon: "🎓", color: "#10b981" },
    { key: "certificate", label: "Certificates", icon: "🏆", color: "#f59e0b" },
    { key: "resume", label: "Resumes", icon: "📄", color: "#8b5cf6" },
    { key: "other", label: "Other", icon: "📎", color: "#64748b" }
  ];

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    uploadTranscript(user.id, file);
    setUploadProgress(100);
    
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(0);
      setFile(null);
    }, 500);
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['pdf'].includes(ext)) return '📕';
    if (['doc', 'docx'].includes(ext)) return '📘';
    if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) return '🖼️';
    return '📄';
  };

  const getFileType = (fileName) => {
    const name = fileName.toLowerCase();
    if (name.includes('transcript')) return 'transcript';
    if (name.includes('certificate') || name.includes('cert')) return 'certificate';
    if (name.includes('resume') || name.includes('cv')) return 'resume';
    return 'other';
  };

  const filteredTranscripts = activeTab === "all" 
    ? myTranscripts 
    : myTranscripts.filter(t => getFileType(t.fileName) === activeTab);

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
    mainLayout: {
      display: "grid",
      gridTemplateColumns: "1fr 400px",
      gap: "2rem"
    },
    documentsSection: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)"
    },
    sectionHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "2rem"
    },
    sectionTitle: {
      fontSize: "1.8rem",
      fontWeight: 700,
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    },
    documentCount: {
      background: "rgba(79, 172, 254, 0.2)",
      padding: "0.5rem 1rem",
      borderRadius: "20px",
      fontSize: "0.9rem",
      fontWeight: 700,
      color: "#4facfe"
    },
    filterTabs: {
      display: "flex",
      gap: "1rem",
      marginBottom: "2rem",
      flexWrap: "wrap"
    },
    filterTab: {
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
      gap: "0.75rem"
    },
    documentsGrid: {
      display: "grid",
      gap: "1.5rem"
    },
    documentCard: {
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "15px",
      padding: "2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden"
    },
    documentHeader: {
      display: "flex",
      alignItems: "flex-start",
      gap: "1.5rem",
      marginBottom: "1.5rem"
    },
    documentIcon: {
      width: "60px",
      height: "60px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.8rem",
      boxShadow: "0 8px 20px rgba(79, 172, 254, 0.3)",
      flexShrink: 0
    },
    documentInfo: {
      flex: 1
    },
    documentName: {
      fontSize: "1.3rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
      color: "white"
    },
    documentMeta: {
      display: "flex",
      gap: "1.5rem",
      flexWrap: "wrap"
    },
    metaItem: {
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500
    },
    documentActions: {
      display: "flex",
      gap: "1rem"
    },
    actionButton: {
      padding: "0.75rem 1.5rem",
      borderRadius: "10px",
      fontSize: "0.9rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "none",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem"
    },
    uploadSection: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "20px",
      padding: "2.5rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      height: "fit-content"
    },
    uploadTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "2rem",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    },
    uploadArea: {
      border: "2px dashed rgba(255, 255, 255, 0.2)",
      borderRadius: "15px",
      padding: "3rem 2rem",
      textAlign: "center",
      transition: "all 0.3s ease",
      marginBottom: "2rem",
      background: file ? "rgba(79, 172, 254, 0.1)" : "transparent",
      borderColor: file ? "#4facfe" : "rgba(255, 255, 255, 0.2)"
    },
    uploadIcon: {
      fontSize: "3rem",
      marginBottom: "1rem",
      opacity: 0.7
    },
    uploadText: {
      fontSize: "1.1rem",
      color: "rgba(255, 255, 255, 0.8)",
      marginBottom: "1rem",
      fontWeight: 500
    },
    fileInput: {
      width: "100%",
      padding: "1rem",
      background: "rgba(255, 255, 255, 0.08)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "10px",
      color: "white",
      cursor: "pointer",
      transition: "all 0.3s ease"
    },
    progressBar: {
      width: "100%",
      height: "6px",
      background: "rgba(255, 255, 255, 0.1)",
      borderRadius: "3px",
      overflow: "hidden",
      marginBottom: "1rem"
    },
    progressFill: {
      height: "100%",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "3px",
      transition: "width 0.3s ease",
      width: `${uploadProgress}%`
    },
    uploadButton: {
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
      padding: "4rem 2rem"
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
    infoFooter: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(20px)",
      borderRadius: "15px",
      padding: "1.5rem 2rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      marginTop: "2rem",
      textAlign: "center"
    },
    infoText: {
      fontSize: "0.9rem",
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
          <div style={{...styles.floatingShape, ...styles.shape1}}></div>
          <div style={{...styles.floatingShape, ...styles.shape2}}></div>
          <div style={{...styles.floatingShape, ...styles.shape3}}></div>
          <div style={styles.gridPattern}></div>
        </div>

        <div style={styles.content}>
          {/* Header Section */}
          <header style={styles.header}>
            <div style={styles.headerIcon}>📚</div>
            <h1 style={styles.title}>Document Vault</h1>
            <p style={styles.subtitle}>
              Securely store and manage your academic documents, certificates, and transcripts
            </p>
          </header>

          <div style={styles.mainLayout}>
            {/* Main Documents Section */}
            <main style={styles.documentsSection}>
              <div style={styles.sectionHeader}>
                <h2 style={styles.sectionTitle}>
                  <span>📋</span>
                  Your Documents
                </h2>
                <div style={styles.documentCount}>
                  {filteredTranscripts.length} document{filteredTranscripts.length !== 1 ? 's' : ''}
                </div>
              </div>

              {/* Filter Tabs */}
              <div style={styles.filterTabs}>
                {documentTypes.map((type) => (
                  <button
                    key={type.key}
                    style={{
                      ...styles.filterTab,
                      background: activeTab === type.key 
                        ? `linear-gradient(135deg, ${type.color}20, ${type.color}10)`
                        : "rgba(255, 255, 255, 0.05)",
                      borderColor: activeTab === type.key ? type.color : "rgba(255, 255, 255, 0.1)",
                      color: activeTab === type.key ? "white" : "rgba(255, 255, 255, 0.7)",
                      transform: activeTab === type.key ? "scale(1.05)" : "scale(1)"
                    }}
                    onClick={() => setActiveTab(type.key)}
                  >
                    <span>{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>

              {/* Documents Grid */}
              <div style={styles.documentsGrid}>
                {filteredTranscripts.length === 0 ? (
                  <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>
                      {activeTab === "all" ? "📭" : "🔍"}
                    </div>
                    <h3 style={styles.emptyTitle}>
                      {activeTab === "all" 
                        ? "No Documents Yet" 
                        : `No ${documentTypes.find(t => t.key === activeTab)?.label}`}
                    </h3>
                    <p style={styles.emptyText}>
                      {activeTab === "all"
                        ? "Upload your first document to get started with your academic portfolio"
                        : `No ${documentTypes.find(t => t.key === activeTab)?.label.toLowerCase()} found. Try uploading some documents.`}
                    </p>
                  </div>
                ) : (
                  filteredTranscripts.map((transcript) => (
                    <div
                      key={transcript.id}
                      style={styles.documentCard}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                      }}
                    >
                      <div style={styles.documentHeader}>
                        <div style={styles.documentIcon}>
                          {getFileIcon(transcript.fileName)}
                        </div>
                        <div style={styles.documentInfo}>
                          <h3 style={styles.documentName}>{transcript.fileName}</h3>
                          <div style={styles.documentMeta}>
                            <div style={styles.metaItem}>
                              <span>📅</span>
                              Uploaded {new Date(transcript.uploadedDate).toLocaleDateString()}
                            </div>
                            <div style={styles.metaItem}>
                              <span>🏷️</span>
                              {getFileType(transcript.fileName)}
                            </div>
                            <div style={styles.metaItem}>
                              <span>👤</span>
                              {user.name}
                            </div>
                          </div>
                        </div>
                        <div style={styles.documentActions}>
                          <button
                            onClick={() => deleteTranscript(transcript.id)}
                            style={{
                              ...styles.actionButton,
                              background: "rgba(239, 68, 68, 0.2)",
                              color: "#ef4444",
                              border: "1px solid rgba(239, 68, 68, 0.3)"
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.background = "rgba(239, 68, 68, 0.3)";
                              e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseOut={(e) => {
                              e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                              e.currentTarget.style.transform = "scale(1)";
                            }}
                          >
                            <span>🗑️</span>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </main>

            {/* Upload Sidebar */}
            <aside style={styles.uploadSection}>
              <h3 style={styles.uploadTitle}>
                <span>📤</span>
                Upload New Document
              </h3>

              <div
                style={styles.uploadArea}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.background = "rgba(79, 172, 254, 0.15)";
                  e.currentTarget.style.borderColor = "#4facfe";
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  e.currentTarget.style.background = file ? "rgba(79, 172, 254, 0.1)" : "transparent";
                  e.currentTarget.style.borderColor = file ? "#4facfe" : "rgba(255, 255, 255, 0.2)";
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  const droppedFile = e.dataTransfer.files[0];
                  if (droppedFile) setFile(droppedFile);
                }}
              >
                <div style={styles.uploadIcon}>📄</div>
                <p style={styles.uploadText}>
                  {file ? file.name : "Drag & drop your file here or click to browse"}
                </p>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={styles.fileInput}
                />
              </div>

              {isUploading && (
                <div style={styles.progressBar}>
                  <div style={styles.progressFill}></div>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                style={{
                  ...styles.uploadButton,
                  opacity: (!file || isUploading) ? 0.6 : 1,
                  cursor: (!file || isUploading) ? "not-allowed" : "pointer"
                }}
                onMouseOver={(e) => file && !isUploading && (e.currentTarget.style.transform = "translateY(-2px)")}
                onMouseOut={(e) => file && !isUploading && (e.currentTarget.style.transform = "translateY(0)")}
              >
                {isUploading ? (
                  <>
                    <span className="spinner">⏳</span>
                    Uploading... {uploadProgress}%
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    Upload Document
                  </>
                )}
              </button>
            </aside>
          </div>

          {/* Info Footer */}
          <div style={styles.infoFooter}>
            <p style={styles.infoText}>
              💡 Supported formats: PDF, DOC, DOCX, JPG, PNG • Max file size: 10MB • 
              All documents are encrypted and securely stored
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