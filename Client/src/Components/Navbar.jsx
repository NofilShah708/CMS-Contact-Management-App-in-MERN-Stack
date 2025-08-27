import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setIsLoggedIn(true);
        } catch (error) {
          console.log(error);
        }
      }
    };
    checkLoggedIn();
  }, []);

  useEffect(() => {
    if (location.pathname === "/logout") {
      logout();
    }
  }, [location]);

  const logout = async () => {
    try {
      const response = await axios.post(
        "https://cms-contact-management.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: isLoggedIn ? "Dashboard" : null,
      path: isLoggedIn ? "/dashboard" : null,
    },
    {
      name: isLoggedIn ? "Add Contact" : null,
      path: isLoggedIn ? "/add-contact" : null,
    },
    {
      name: isLoggedIn ? "Logout" : "Login/Register",
      path: isLoggedIn ? "/logout" : "/auth",
    },
  ];

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: "rgba(102, 126, 234, 0.1)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "1rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          textDecoration: "none",
          color: "white",
          fontSize: "1.5rem",
          fontWeight: "bold",
          zIndex: 1001,
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: "0.5rem",
            boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <span>ContactHub</span>
      </Link>

      {/* Desktop Navigation */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "1rem",
              fontWeight: location.pathname === link.path ? "bold" : "normal",
              padding: "0.5rem 1rem",
              borderRadius: "25px",
              transition: "all 0.3s ease",
              background:
                location.pathname === link.path
                  ? "rgba(255, 255, 255, 0.2)"
                  : "transparent",
              backdropFilter:
                location.pathname === link.path ? "blur(5px)" : "none",
            }}
            onMouseEnter={(e) => {
              if (location.pathname !== link.path) {
                e.target.style.background = "rgba(255, 255, 255, 0.1)";
                e.target.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (location.pathname !== link.path) {
                e.target.style.background = "transparent";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button
        style={{
          display: "none",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "1.5rem",
          cursor: "pointer",
          zIndex: 1001,
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div
          style={{
            width: "25px",
            height: "3px",
            backgroundColor: "white",
            margin: "5px 0",
            transition: "all 0.3s ease",
            transform: isMenuOpen ? "rotate(45deg)" : "rotate(0deg)",
            transformOrigin: "center",
          }}
        />
        <div
          style={{
            width: "25px",
            height: "3px",
            backgroundColor: "white",
            margin: "5px 0",
            transition: "all 0.3s ease",
            opacity: isMenuOpen ? 0 : 1,
          }}
        />
        <div
          style={{
            width: "25px",
            height: "3px",
            backgroundColor: "white",
            margin: "5px 0",
            transition: "all 0.3s ease",
            transform: isMenuOpen ? "rotate(-45deg)" : "rotate(0deg)",
            transformOrigin: "center",
          }}
        />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backdropFilter: "blur(20px)",
          zIndex: 999,
          display: isMenuOpen ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            padding: "2rem",
          }}
          className="mobile-menu"
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "1.5rem",
                fontWeight: location.pathname === link.path ? "bold" : "normal",
                padding: "1rem 2rem",
                borderRadius: "50px",
                background:
                  location.pathname === link.path
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                transition: "all 0.3s ease",
                textAlign: "center",
                minWidth: "200px",
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          nav {
            padding: 1rem;
          }
          nav > div:nth-child(2) {
            display: none !important;
          }
          nav > button {
            display: block !important;
          }
        }
        @media (max-width: 480px) {
          nav {
            padding: 0.75rem 1rem;
          }
          nav > a {
            font-size: 1.2rem;
          }
          nav > a > div {
            width: 35px;
            height: 35px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
