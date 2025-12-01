// src/pages/student/Transcripts.jsx
import React, { useState } from "react";
import Navbar from "../../components/Navbar";

export default function Transcripts() {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    if (!file) return alert("Please select a file");
    // In a real app, upload file to server here
    alert(`Uploaded: ${file.name}`);
    setFile(null);
  };

  return (
    <>
      <Navbar />
      <main style={{ 
        padding: 32, 
        minHeight: "100vh", 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
      }}>
        <div style={{
          maxWidth: 600,
          margin: "0 auto"
        }}>
          {/* Header Section */}
          <div style={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            padding: "32px",
            borderRadius: "24px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            marginBottom: "32px",
            border: "1px solid rgba(255,255,255,0.3)",
            textAlign: "center"
          }}>
            <div style={{
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #4facfe, #00f2fe)",
              borderRadius: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "32px",
              boxShadow: "0 8px 20px rgba(79, 172, 254, 0.3)"
            }}>
              📄
            </div>
            <h2 style={{ 
              fontSize: "32px", 
              fontWeight: "800", 
              color: "#1a202c",
              marginBottom: "12px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}>
              Upload Transcripts
            </h2>
            <p style={{ 
              fontSize: "16px", 
              color: "#64748b",
              fontWeight: "500",
              lineHeight: "1.6"
            }}>
              Upload your academic transcripts and certificates for verification and applications
            </p>
          </div>

          {/* Upload Card */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              padding: "40px",
              borderRadius: "24px",
              boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
              border: "1px solid rgba(255,255,255,0.3)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Background Decorations */}
            <div style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "120px",
              height: "120px",
              background: "rgba(79, 172, 254, 0.1)",
              borderRadius: "50%"
            }}></div>
            <div style={{
              position: "absolute",
              bottom: "-40px",
              left: "-40px",
              width: "100px",
              height: "100px",
              background: "rgba(255, 107, 107, 0.1)",
              borderRadius: "50%"
            }}></div>

            {/* File Input Section */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", position: "relative", zIndex: "2" }}>
              <label style={{ 
                fontWeight: "700", 
                color: "#1e293b",
                fontSize: "18px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <span>📁</span> Select Document
              </label>
              
              <div style={{
                border: "2px dashed #cbd5e1",
                borderRadius: "16px",
                padding: "40px 24px",
                textAlign: "center",
                transition: "all 0.3s ease",
                background: file ? "rgba(79, 172, 254, 0.05)" : "transparent",
                borderColor: file ? "#4facfe" : "#cbd5e1"
              }}>
                <div style={{
                  fontSize: "48px",
                  marginBottom: "16px",
                  opacity: "0.7"
                }}>
                  📤
                </div>
                <p style={{ 
                  color: "#64748b", 
                  fontWeight: "500",
                  marginBottom: "16px"
                }}>
                  {file ? file.name : "Drag & drop your file here or click to browse"}
                </p>
                <input
                  type="file"
                  onChange={e => setFile(e.target.files[0])}
                  style={{ 
                    display: "none" 
                  }}
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  style={{
                    display: "inline-block",
                    padding: "12px 24px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                    color: "white",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 15px rgba(79, 172, 254, 0.4)"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 25px rgba(79, 172, 254, 0.6)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(79, 172, 254, 0.4)";
                  }}
                >
                  Browse Files
                </label>
              </div>

              {/* File Info */}
              {file && (
                <div style={{
                  background: "rgba(74, 222, 128, 0.1)",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(74, 222, 128, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(74, 222, 128, 0.2)",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    color: "#4ade80"
                  }}>
                    ✅
                  </div>
                  <div>
                    <p style={{ 
                      fontWeight: "600", 
                      color: "#1e293b",
                      margin: "0 0 4px 0"
                    }}>
                      {file.name}
                    </p>
                    <p style={{ 
                      fontSize: "12px", 
                      color: "#64748b",
                      margin: "0"
                    }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB • Ready to upload
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload Button */}
            <button
              onClick={handleUpload}
              disabled={!file}
              style={{
                padding: "18px 32px",
                borderRadius: "16px",
                background: file ? "linear-gradient(135deg, #ff6b6b, #ff8e53)" : "linear-gradient(135deg, #cbd5e1, #94a3b8)",
                color: "white",
                fontWeight: "700",
                fontSize: "16px",
                border: "none",
                cursor: file ? "pointer" : "not-allowed",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: file ? "0 4px 15px rgba(255, 107, 107, 0.4)" : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                position: "relative",
                zIndex: "2"
              }}
              onMouseOver={e => file && (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseOut={e => file && (e.currentTarget.style.transform = "translateY(0)")}
            >
              <span>🚀</span>
              Upload Document
              <span>📄</span>
            </button>

            {/* Help Text */}
            <div style={{
              background: "rgba(255, 255, 255, 0.8)",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              marginTop: "16px"
            }}>
              <p style={{ 
                fontSize: "14px", 
                color: "#64748b",
                fontWeight: "500",
                margin: "0",
                textAlign: "center"
              }}>
                💡 Supported formats: PDF, JPG, PNG • Max file size: 10MB
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}