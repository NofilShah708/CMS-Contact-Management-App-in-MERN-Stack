import React, { useState } from "react";
import axios from "axios";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://cms-contact-management.onrender.com/api/auth/${isLogin ? "login" : "register"}`,
        formData,
        { withCredentials: true }
      );
      localStorage.setItem("token", res.data.token);
      if (isLogin) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/auth";
      }
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
      }}
    >
      {/* Background Animation */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "auto",
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.1)",
              animation: `float ${20 + i * 2}s infinite ease-in-out`,
              width: `${60 + i * 20}px`,
              height: `${60 + i * 20}px`,
              left: `${10 + i * 15}%`,
              animationDelay: `${i * 1.5}s`,
              top: `${15 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* Form Container */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "25px",
          padding: "1.5rem",
          maxWidth: "500px",
          width: "100%",
          margin: "0 auto",
          zIndex: 2,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "1rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              background: "linear-gradient(45deg, #fff, #e0e7ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {isLogin ? "Login" : "Register"}
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              opacity: 0.9,
            }}
          >
            {isLogin
              ? "Welcome back! Please login to your account."
              : "Create a new account."}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {/* Name (only for Register) */}
          {!isLogin && (
            <div>
              <label
                style={{
                  display: "block",
                  color: "white",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                }}
              >
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                style={{
                  width: "100%",
                  padding: "1rem",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "white",
                  fontSize: "1rem",
                  outline: "none",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")
                }
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label
              style={{
                display: "block",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john.doe@example.com"
              style={{
                width: "100%",
                padding: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "15px",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")
              }
            />
          </div>

          {/* Password */}
          <div>
            <label
              style={{
                display: "block",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "0.5rem",
              }}
            >
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="********"
              style={{
                width: "100%",
                padding: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "15px",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#667eea")}
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")
              }
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                color: "red",
                fontSize: "1rem",
                fontWeight: "bold",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              padding: "1rem",
              border: "none",
              borderRadius: "15px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(102, 126, 234, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(102, 126, 234, 0.3)";
            }}
          >
            {isLogin ? "Login" : "Register"}
          </button>

          {/* Switch between Login and Register */}
          <div
            style={{
              textAlign: "center",
              marginTop: "1rem",
              color: "white",
            }}
          >
            <span style={{ marginRight: "0.5rem" }}>
              {isLogin ? "Don’t have an account?" : "Already have an account?"}
            </span>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .form-container {
            padding: 2rem;
            margin: 1rem;
          }
        }

        @media (max-width: 480px) {

 .form-container {
            padding: 1.5rem;
            margin: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Auth;
