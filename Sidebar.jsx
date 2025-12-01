import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ links = [] }) {
  const location = useLocation();

  const styles = {
    sidebar: {
      width: 280,
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      padding: "2rem 1rem",
      minHeight: "100vh",
      boxSizing: "border-box",
      position: "relative",
      overflow: "hidden",
      borderRight: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(15px)"
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
    shape1: { width: "200px", height: "200px", top: "-50px", right: "-50px", animationDelay: "0s" },
    shape2: { width: "150px", height: "150px", bottom: "-60px", left: "-60px", animationDelay: "3s" },
    shape3: { width: "100px", height: "100px", top: "40%", left: "20%", animationDelay: "6s" },
    gridPattern: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      backgroundSize: "40px 40px",
      opacity: 0.5
    },
    header: {
      padding: "0 1rem 2rem 1rem",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      marginBottom: "1.5rem",
      position: "relative",
      zIndex: 2
    },
    headerTitle: {
      fontSize: "1.5rem",
      fontWeight: 800,
      color: "white",
      marginBottom: "0.5rem",
      background: "linear-gradient(135deg, #fff 0%, #a5b4fc 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      textShadow: "0 2px 10px rgba(0,0,0,0.3)"
    },
    headerSubtitle: {
      fontSize: "0.9rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500
    },
    navList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      display: "flex",
      flexDirection: "column",
      gap: "0.5rem",
      position: "relative",
      zIndex: 2
    },
    navItem: {
      margin: 0
    },
    navLink: {
      display: "flex",
      alignItems: "center",
      gap: "0.75rem",
      padding: "1rem 1.25rem",
      borderRadius: "12px",
      textDecoration: "none",
      fontWeight: 600,
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      position: "relative",
      overflow: "hidden",
      border: "1px solid transparent"
    },
    navLinkActive: {
      background: "linear-gradient(135deg, rgba(79, 172, 254, 0.2), rgba(0, 242, 254, 0.1))",
      color: "white",
      border: "1px solid rgba(79, 172, 254, 0.3)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 8px 25px rgba(79, 172, 254, 0.3)",
      transform: "translateX(8px)"
    },
    navLinkInactive: {
      background: "rgba(255, 255, 255, 0.05)",
      color: "rgba(255, 255, 255, 0.8)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)"
    },
    navLinkHover: {
      background: "rgba(255, 255, 255, 0.08)",
      color: "white",
      transform: "translateX(8px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
    },
    icon: {
      width: "20px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1rem",
      transition: "all 0.3s ease"
    },
    iconActive: {
      transform: "scale(1.1)"
    },
    label: {
      fontSize: "0.9rem",
      fontWeight: 600,
      flex: 1,
      transition: "all 0.3s ease"
    },
    activeIndicator: {
      width: "6px",
      height: "6px",
      background: "linear-gradient(135deg, #4facfe, #00f2fe)",
      borderRadius: "50%",
      animation: "pulse 2s infinite",
      boxShadow: "0 0 10px rgba(79, 172, 254, 0.5)"
    },
    hoverArrow: {
      fontSize: "0.8rem",
      opacity: 0,
      transform: "translateX(-8px)",
      transition: "all 0.3s ease",
      fontWeight: 700,
      color: "#4facfe"
    },
    hoverArrowVisible: {
      opacity: 1,
      transform: "translateX(0)"
    },
    footer: {
      position: "absolute",
      bottom: "2rem",
      left: "1rem",
      right: "1rem",
      background: "rgba(255, 255, 255, 0.08)",
      backdropFilter: "blur(15px)",
      padding: "1rem",
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      textAlign: "center"
    },
    footerText: {
      fontSize: "0.8rem",
      color: "rgba(255, 255, 255, 0.7)",
      fontWeight: 500,
      margin: 0
    }
  };

  return (
    <aside style={styles.sidebar}>
      {/* Animated Background */}
      <div style={styles.background}>
        <div style={{...styles.floatingShape, ...styles.shape1}}></div>
        <div style={{...styles.floatingShape, ...styles.shape2}}></div>
        <div style={{...styles.floatingShape, ...styles.shape3}}></div>
        <div style={styles.gridPattern}></div>
      </div>

      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Navigation</h2>
        <p style={styles.headerSubtitle}>Manage your platform</p>
      </div>

      {/* Navigation Links */}
      <ul style={styles.navList}>
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          const [isHovered, setIsHovered] = React.useState(false);

          return (
            <li key={link.to} style={styles.navItem}>
              <Link
                to={link.to}
                style={{
                  ...styles.navLink,
                  ...(isActive ? styles.navLinkActive : styles.navLinkInactive),
                  ...(isHovered && !isActive ? styles.navLinkHover : {})
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* Icon */}
                <div style={{
                  ...styles.icon,
                  ...(isActive ? styles.iconActive : {})
                }}>
                  {link.icon}
                </div>
                
                {/* Label */}
                <span style={styles.label}>
                  {link.label}
                </span>
                
                {/* Active Indicator */}
                {isActive && (
                  <div style={styles.activeIndicator}></div>
                )}
                
                {/* Hover Arrow */}
                {!isActive && (
                  <div style={{
                    ...styles.hoverArrow,
                    ...(isHovered ? styles.hoverArrowVisible : {})
                  }}>
                    →
                  </div>
                )}
                
                {/* Active Gradient Overlay */}
                {isActive && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(135deg, rgba(79, 172, 254, 0.1), transparent)",
                    borderRadius: "12px",
                    zIndex: -1
                  }}></div>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div style={styles.footer}>
        <p style={styles.footerText}>
          🚀 Career Path Lesotho
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          33% { 
            transform: translateY(-10px) rotate(120deg); 
          }
          66% { 
            transform: translateY(5px) rotate(240deg); 
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 1;
            transform: scale(1);
          }
          50% { 
            opacity: 0.7;
            transform: scale(1.1);
          }
        }
      `}</style>
    </aside>
  );
}