import React, { useState } from "react";
import axios from "axios";

const AddContact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "Personal",
    address: "",
  });

  const categories = ["Personal", "Work", "Business", "Family", "Friends"];

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
        "https://cms-contact-management.onrender.com/api/contacts/addcontact", // Update this URL if needed
        formData,
        { withCredentials: true } // This sends cookies (token) with the request
      );
      alert("Contact added successfully!");
      // Optionally, reset form or redirect
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "",
        address: "",
      });

      window.location.href = "/dashboard";
    } catch (error) {
      alert(
        error.response?.data?.error ||
          "Failed to add contact. Please try again."
      );
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      Personal: "#764ba2",
      Work: "#667eea",
      Business: "#f093fb",
      Family: "#4facfe",
      Friends: "#43e97b",
    };
    return colors[category] || "#667eea";
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        paddingTop: "80px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        padding: "2rem",
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
          zIndex: 1,
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
          zIndex: 2,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "2rem",
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
            Add New Contact
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              opacity: 0.9,
            }}
          >
            Fill in the details to add a new contact to your network
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {/* Name */}
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

          {/* Phone */}
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
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+1 (555) 123-4567"
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

          {/* Category */}
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
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "15px",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  style={{ background: "#667eea", color: "white" }}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
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
              Address (Optional)
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City, State"
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

          {/* Submit Button */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <button
              type="submit"
              style={{
                flex: 1,
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
                e.target.style.boxShadow =
                  "0 6px 20px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 15px rgba(102, 126, 234, 0.3)";
              }}
            >
              Add Contact
            </button>
            <button
              type="button"
              onClick={() => window.history.back()}
              style={{
                flex: 1,
                padding: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                borderRadius: "15px",
                background: "transparent",
                color: "white",
                fontSize: "1.1rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255, 255, 255, 0.1)")
              }
              onMouseLeave={(e) => (e.target.style.background = "transparent")}
            >
              Cancel
            </button>
          </div>
        </form>
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

        input::placeholder, textarea::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }

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

export default AddContact;
