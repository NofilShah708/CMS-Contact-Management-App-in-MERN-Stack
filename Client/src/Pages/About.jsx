import React from "react";

const About = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",

        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        position: "relative",
        padding: "80px", // Account for navbar
      }}
    >
      {/* Background Elements */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "auto",
          zIndex: 1,
        }}
      >
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              animation: `float ${20 + i * 2}s infinite ease-in-out`,
              width: `${50 + i * 15}px`,
              height: `${50 + i * 15}px`,
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 1.5}s`,
              top: `${15 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div
        style={{
          textAlign: "center",
          color: "white",
          zIndex: 2,
          maxWidth: "1000px",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        {/* Title */}
        <h1
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            marginBottom: "2rem",
            background: "linear-gradient(45deg, #fff, #e0e7ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "fadeInUp 1s ease-out",
          }}
        >
          About ContactHub
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "1.3rem",
            marginBottom: "2rem",
            opacity: 0.9,
            lineHeight: 1.8,
            animation: "fadeInUp 1s ease-out 0.2s both",
          }}
        >
          Welcome to ContactHub, where managing your connections becomes an art
          form. We've reimagined the traditional contact manager into a
          beautiful, intuitive experience that grows with you.
        </p>

        {/* Features Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            margin: "2rem 0",
            animation: "fadeInUp 1s ease-out 0.4s both",
          }}
        >
          {[
            {
              icon: "🎯",
              title: "Smart Organization",
              desc: "AI-powered contact categorization",
            },
            {
              icon: "🔒",
              title: "Secure Storage",
              desc: "End-to-end encrypted data",
            },
            {
              icon: "☁️",
              title: "Cloud Sync",
              desc: "Access anywhere, anytime",
            },
            {
              icon: "🚀",
              title: "Lightning Fast",
              desc: "Instant search and retrieval",
            },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "20px",
                padding: "1.5rem",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div
                style={{
                  fontSize: "2.5rem",
                  marginBottom: "1rem",
                }}
              >
                {feature.icon}
              </div>
              <h3
                style={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                {feature.title}
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.8,
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(20px) rotate(240deg);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        body {
          margin: 0;
          padding: 0;
          overflow: auto;
        }
      `}</style>
    </div>
  );
};

export default About;
