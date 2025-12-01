import React from "react";
import RoutesConfig from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        fontFamily: "'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
        position: "relative",
        overflowX: "hidden"
      }}
    >
      {/* Animated Background Elements */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "10%",
          width: "300px",
          height: "300px",
          background: "rgba(255, 255, 255, 0.05)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 6s ease-in-out infinite",
          zIndex: 0
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "5%",
          right: "5%",
          width: "200px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.03)",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "float 8s ease-in-out infinite reverse",
          zIndex: 0
        }}
      />
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "80%",
          width: "150px",
          height: "150px",
          background: "rgba(255, 255, 255, 0.04)",
          borderRadius: "50%",
          filter: "blur(25px)",
          animation: "float 10s ease-in-out infinite",
          zIndex: 0
        }}
      />

      {/* Main Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <RoutesConfig />
      </div>

      {/* Enhanced Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          marginTop: "80px"
        }}
        toastStyle={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "16px",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          color: "#1e293b",
          fontSize: "14px",
          fontWeight: "500"
        }}
        progressStyle={{
          background: "linear-gradient(135deg, #4facfe, #00f2fe)"
        }}
      />

      {/* Global Styles for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #4facfe, #00f2fe);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }
        
        /* Selection color */
        ::selection {
          background: rgba(79, 172, 254, 0.3);
          color: #1e293b;
        }
        
        /* Focus styles for accessibility */
        *:focus {
          outline: 2px solid #4facfe;
          outline-offset: 2px;
        }
      `}</style>

      {/* Loading State Indicator (optional) */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(20px)",
          padding: "12px 24px",
          borderRadius: "25px",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
          fontSize: "14px",
          fontWeight: "600",
          color: "#4facfe",
          display: "none", /* Hidden by default, can be shown during loading */
          alignItems: "center",
          gap: "8px",
          zIndex: 1000
        }}
        id="global-loading-indicator"
      >
        <div
          style={{
            width: "16px",
            height: "16px",
            border: "2px solid #4facfe",
            borderTop: "2px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }}
        />
        Loading...
      </div>

      {/* Network Status Indicator */}
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          background: "#10b981",
          boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
          zIndex: 1000,
          display: "none"
        }}
        id="network-status"
      />

      {/* Additional Global Style */}
      <style jsx global>{`
        /* Enhanced button hover effects */
        .glass-button {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        .glass-button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
        }
        
        /* Card hover effects */
        .glass-card {
          transition: all 0.3s ease !important;
        }
        
        .glass-card:hover {
          transform: translateY(-4px) !important;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15) !important;
        }
        
        /* Loading animation */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        /* Fade in animation for page transitions */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .page-transition {
          animation: fadeIn 0.5s ease-out;
        }
        
        /* Pulse animation for attention */
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .pulse {
          animation: pulse 2s infinite;
        }
        
        /* Shimmer loading effect */
        @keyframes shimmer {
          0% {
            background-position: -468px 0;
          }
          100% {
            background-position: 468px 0;
          }
        }
        
        .shimmer {
          animation: shimmer 1.5s infinite linear;
          background: linear-gradient(to right, #f6f7f8 8%, #edeef1 18%, #f6f7f8 33%);
          background-size: 800px 104px;
        }
      `}</style>

      {/* Script for enhanced functionality */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            // Network status monitoring
            window.addEventListener('online', () => {
              const indicator = document.getElementById('network-status');
              if (indicator) {
                indicator.style.background = '#10b981';
                indicator.style.display = 'block';
                setTimeout(() => {
                  indicator.style.display = 'none';
                }, 3000);
              }
            });
            
            window.addEventListener('offline', () => {
              const indicator = document.getElementById('network-status');
              if (indicator) {
                indicator.style.background = '#ef4444';
                indicator.style.display = 'block';
              }
            });
            
            // Add page transition class to main content
            document.addEventListener('DOMContentLoaded', () => {
              const main = document.querySelector('main');
              if (main) {
                main.classList.add('page-transition');
              }
            });
          `
        }}
      />
    </div>
  );
}