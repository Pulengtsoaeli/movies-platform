import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { useAppData } from "../../context/ApplicationContext";
import { useAuth } from "../../context/AuthContext";

export default function ApplyForCourse() {
  const { courses, applyForCourse } = useAppData();
  const { user } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [applicationText, setApplicationText] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableCourses = courses.filter(
    (course) => course.institutionId && course.facultyName
  );

  const selectedCourse = courses.find((c) => c.id === selectedCourseId);

  const steps = [
    { number: 1, title: "Select Course", icon: "🎯" },
    { number: 2, title: "Write Motivation", icon: "💭" },
    { number: 3, title: "Review & Submit", icon: "🚀" }
  ];

  const handleApply = async () => {
    if (!selectedCourse) return;
    
    setIsSubmitting(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    applyForCourse({
      id: `app_${Date.now()}`,
      studentId: user.id.toString(),
      studentName: user.name,
      courseId: selectedCourseId,
      courseTitle: selectedCourse.title,
      facultyId: selectedCourse.facultyId || "",
      facultyName: selectedCourse.facultyName,
      institutionId: selectedCourse.institutionId,
      institutionName: selectedCourse.institutionName,
      applicationText: applicationText.trim(),
      status: "pending",
      appliedDate: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setSelectedCourseId("");
    setApplicationText("");
    setCurrentStep(1);
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
      maxWidth: "800px",
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
    progressBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "3rem",
      position: "relative"
    },
    stepContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "1rem",
      zIndex: 2
    },
    stepCircle: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.5rem",
      fontWeight: 700,
      transition: "all 0.4s ease",
      position: "relative"
    },
    stepLine: {
      position: "absolute",
      top: "30px",
      height: "3px",
      background: "rgba(255, 255, 255, 0.2)",
      transition: "all 0.4s ease"
    },
    stepTitle: {
      fontSize: "0.9rem",
      fontWeight: 600,
      color: "rgba(255, 255, 255, 0.7)",
      textAlign: "center",
      transition: "all 0.3s ease"
    },
    formCard: {
      background: "rgba(255, 255, 255, 0.05)",
      backdropFilter: "blur(40px)",
      borderRadius: "25px",
      padding: "3rem",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
      marginBottom: "2rem"
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
      marginBottom: "2rem"
    },
    label: {
      fontSize: "1.1rem",
      fontWeight: 600,
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem"
    },
    select: {
      width: "100%",
      padding: "1.2rem 1.5rem",
      background: "rgba(255, 255, 255, 0.08)",
      border: "2px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      color: "white",
      fontSize: "1rem",
      fontWeight: 500,
      transition: "all 0.3s ease",
      cursor: "pointer"
    },
    option: {
      background: "#1e293b",
      color: "white",
      padding: "1rem"
    },
    textarea: {
      width: "100%",
      minHeight: "180px",
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
    coursePreview: {
      background: "rgba(79, 172, 254, 0.1)",
      padding: "2rem",
      borderRadius: "20px",
      border: "1px solid rgba(79, 172, 254, 0.3)",
      marginBottom: "2rem",
      animation: "slideIn 0.5s ease-out"
    },
    courseHeader: {
      display: "flex",
      alignItems: "center",
      gap: "1.5rem",
      marginBottom: "1.5rem"
    },
    courseIcon: {
      width: "60px",
      height: "60px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "15px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.8rem",
      boxShadow: "0 8px 20px rgba(79, 172, 254, 0.3)"
    },
    courseTitle: {
      fontSize: "1.5rem",
      fontWeight: 700,
      marginBottom: "0.5rem",
      color: "white"
    },
    courseMeta: {
      fontSize: "1rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500
    },
    actionButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "space-between",
      marginTop: "2rem"
    },
    button: {
      padding: "1.2rem 2.5rem",
      borderRadius: "15px",
      fontSize: "1.1rem",
      fontWeight: 700,
      border: "none",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      minWidth: "160px"
    },
    primaryButton: {
      background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      color: "white",
      boxShadow: "0 8px 25px rgba(79, 172, 254, 0.4)"
    },
    secondaryButton: {
      background: "rgba(255, 255, 255, 0.1)",
      color: "white",
      border: "1px solid rgba(255, 255, 255, 0.2)"
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

        <div style={styles.content}>
          {/* Header Section */}
          <header style={styles.header}>
            <div style={styles.headerIcon}>🚀</div>
            <h1 style={styles.title}>Launch Your Journey</h1>
            <p style={styles.subtitle}>
              Apply to your dream courses and take the first step toward your academic future
            </p>
          </header>

          {/* Progress Steps */}
          <div style={styles.progressBar}>
            {steps.map((step, index) => {
              const isActive = step.number === currentStep;
              const isCompleted = step.number < currentStep;
              const lineWidth = `calc((100% - 240px) / 2)`;
              
              return (
                <React.Fragment key={step.number}>
                  <div style={styles.stepContainer}>
                    <div
                      style={{
                        ...styles.stepCircle,
                        background: isActive || isCompleted 
                          ? "linear-gradient(135deg, #4facfe, #00f2fe)" 
                          : "rgba(255, 255, 255, 0.1)",
                        transform: isActive ? "scale(1.1)" : "scale(1)",
                        boxShadow: isActive ? "0 8px 25px rgba(79, 172, 254, 0.4)" : "none"
                      }}
                    >
                      {isCompleted ? "✓" : step.icon}
                    </div>
                    <div
                      style={{
                        ...styles.stepTitle,
                        color: isActive || isCompleted ? "white" : "rgba(255, 255, 255, 0.5)",
                        fontWeight: isActive ? 700 : 600
                      }}
                    >
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      style={{
                        ...styles.stepLine,
                        width: lineWidth,
                        background: step.number < currentStep 
                          ? "linear-gradient(135deg, #4facfe, #00f2fe)" 
                          : "rgba(255, 255, 255, 0.2)"
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Application Form */}
          <div style={styles.formCard}>
            {availableCourses.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📭</div>
                <h3 style={styles.emptyTitle}>No Courses Available</h3>
                <p style={styles.emptyText}>
                  We're currently updating our course offerings. 
                  Check back soon for new opportunities to advance your education.
                </p>
              </div>
            ) : (
              <>
                {/* Step 1: Course Selection */}
                {currentStep === 1 && (
                  <div style={styles.formGroup}>
                    <label style={styles.label}>
                      <span>🎯</span>
                      Choose Your Course
                    </label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      style={{
                        ...styles.select,
                        borderColor: selectedCourseId ? "#4facfe" : "rgba(255, 255, 255, 0.1)"
                      }}
                    >
                      <option value="" style={styles.option}>-- Select a Course --</option>
                      {availableCourses.map((course) => (
                        <option key={course.id} value={course.id} style={styles.option}>
                          {course.title} — {course.facultyName}
                        </option>
                      ))}
                    </select>
                    
                    {selectedCourse && (
                      <button
                        onClick={() => setCurrentStep(2)}
                        style={{
                          ...styles.button,
                          ...styles.primaryButton,
                          marginTop: "1rem"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}
                      >
                        <span>👉</span>
                        Continue to Motivation
                      </button>
                    )}
                  </div>
                )}

                {/* Step 2: Motivation */}
                {currentStep === 2 && selectedCourse && (
                  <>
                    <div style={styles.coursePreview}>
                      <div style={styles.courseHeader}>
                        <div style={styles.courseIcon}>📖</div>
                        <div>
                          <h3 style={styles.courseTitle}>{selectedCourse.title}</h3>
                          <p style={styles.courseMeta}>{selectedCourse.facultyName}</p>
                        </div>
                      </div>
                    </div>

                    <div style={styles.formGroup}>
                      <label style={styles.label}>
                        <span>💭</span>
                        Share Your Motivation
                      </label>
                      <textarea
                        placeholder="Tell us about your passion for this field, your career aspirations, and why you believe this course is the right fit for you..."
                        value={applicationText}
                        onChange={(e) => setApplicationText(e.target.value)}
                        style={{
                          ...styles.textarea,
                          borderColor: applicationText ? "#4facfe" : "rgba(255, 255, 255, 0.1)"
                        }}
                      />
                      
                      <div style={styles.actionButtons}>
                        <button
                          onClick={() => setCurrentStep(1)}
                          style={{
                            ...styles.button,
                            ...styles.secondaryButton
                          }}
                          onMouseOver={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"}
                          onMouseOut={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                        >
                          <span>👈</span>
                          Back
                        </button>
                        <button
                          onClick={() => setCurrentStep(3)}
                          disabled={!applicationText.trim()}
                          style={{
                            ...styles.button,
                            ...styles.primaryButton,
                            opacity: applicationText.trim() ? 1 : 0.6,
                            cursor: applicationText.trim() ? "pointer" : "not-allowed"
                          }}
                          onMouseOver={(e) => applicationText.trim() && (e.currentTarget.style.transform = "translateY(-2px)")}
                          onMouseOut={(e) => applicationText.trim() && (e.currentTarget.style.transform = "translateY(0)")}
                        >
                          <span>📋</span>
                          Review Application
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 3: Review & Submit */}
                {currentStep === 3 && selectedCourse && (
                  <>
                    <div style={styles.coursePreview}>
                      <div style={styles.courseHeader}>
                        <div style={styles.courseIcon}>🎓</div>
                        <div>
                          <h3 style={styles.courseTitle}>Ready to Submit</h3>
                          <p style={styles.courseMeta}>Review your application details</p>
                        </div>
                      </div>
                      
                      <div style={{ marginTop: "1.5rem" }}>
                        <div style={{ marginBottom: "1rem" }}>
                          <strong style={{ color: "#4facfe" }}>Course:</strong> {selectedCourse.title}
                        </div>
                        <div style={{ marginBottom: "1rem" }}>
                          <strong style={{ color: "#4facfe" }}>Faculty:</strong> {selectedCourse.facultyName}
                        </div>
                        <div>
                          <strong style={{ color: "#4facfe" }}>Your Motivation:</strong>
                          <p style={{ marginTop: "0.5rem", color: "rgba(255, 255, 255, 0.8)", lineHeight: 1.6 }}>
                            {applicationText}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div style={styles.actionButtons}>
                      <button
                        onClick={() => setCurrentStep(2)}
                        style={{
                          ...styles.button,
                          ...styles.secondaryButton
                        }}
                        onMouseOver={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)"}
                        onMouseOut={(e) => e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)"}
                      >
                        <span>👈</span>
                        Edit Application
                      </button>
                      <button
                        onClick={handleApply}
                        disabled={isSubmitting}
                        style={{
                          ...styles.button,
                          ...styles.primaryButton,
                          background: isSubmitting 
                            ? "linear-gradient(135deg, #94a3b8, #cbd5e1)" 
                            : "linear-gradient(135deg, #10b981, #34d399)",
                          boxShadow: isSubmitting ? "none" : "0 8px 25px rgba(16, 185, 129, 0.4)"
                        }}
                        onMouseOver={(e) => !isSubmitting && (e.currentTarget.style.transform = "translateY(-2px)")}
                        onMouseOut={(e) => !isSubmitting && (e.currentTarget.style.transform = "translateY(0)")}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner">⏳</span>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <span>🚀</span>
                            Launch Application
                          </>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Application Tips */}
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
              Crafting Your Perfect Application
            </h3>
            <div style={styles.tipsList}>
              {[
                { icon: "🎯", text: "Be specific about your interests and career goals" },
                { icon: "🌟", text: "Highlight relevant experience or background" },
                { icon: "📈", text: "Explain how this course aligns with your aspirations" },
                { icon: "💫", text: "Show genuine passion and enthusiasm for the field" },
                { icon: "🎓", text: "Keep it concise but meaningful and personal" }
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
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
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