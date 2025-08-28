import React, { useState, useEffect } from "react";
import axios from "axios";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = ["All", "Work", "Personal", "Business", "Family"];

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || contact.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get(
          "https://cms-contact-management.onrender.com/api/contacts/getallcontacts",
          { withCredentials: true }
        );
        setContacts(res.data.contacts || []); // Adjust if your backend returns a different structure
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://cms-contact-management.onrender.com/api/auth/profile", {
          withCredentials: true,
        });
        setProfile(res.data.user || null);

        console.log(res.data.user);
        // Adjust if your backend returns a different structure
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };
    fetchProfile();
  }, []);

  const getCategoryColor = (category) => {
    const colors = {
      Work: "#667eea",
      Personal: "#764ba2",
      Business: "#f093fb",
      Family: "#4facfe",
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
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "2rem",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Hello 👋 {profile && profile.name}'s
          <br />
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            opacity: 0.9,
          }}
        >
          Your contact dashboard will be hear.
        </p>
      </div>

      {/* Controls */}
      <div
        style={{
          padding: "0 2rem 2rem",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Search */}
        <div
          style={{
            flex: 1,
            minWidth: "250px",
            position: "relative",
          }}
        >
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "1rem 1rem 1rem 3rem",
              border: "none",
              borderRadius: "50px",
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              color: "white",
              fontSize: "1rem",
              outline: "none",
            }}
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            style={{
              position: "absolute",
              left: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "1rem",
            border: "none",
            borderRadius: "50px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            color: "white",
            fontSize: "1rem",
            outline: "none",
            cursor: "pointer",
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

        {/* Add Contact Button */}
        <button
          style={{
            padding: "1rem 2rem",
            border: "none",
            borderRadius: "50px",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            fontSize: "1rem",
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
          onClick={() => (window.location.href = "/add-contact")}
        >
          + Add Contact
        </button>
      </div>

      {/* Contacts Grid */}
      <div
        style={{
          padding: "0 2rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {filteredContacts.map((contact) => (
          <div
            key={contact._id}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              padding: "2rem",
              transition: "all 0.3s ease",
              color: "white",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow =
                "0 10px 30px rgba(0, 0, 0, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* Contact Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              {/* <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${getCategoryColor(
                    contact.category
                  )}, ${getCategoryColor(contact.category)}aa)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  marginRight: "1rem",
                }}
              >
                {contact.avatar}
              </div> */}
              <div>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    margin: 0,
                  }}
                >
                  {contact.name}
                </h3>
                <span
                  style={{
                    fontSize: "0.9rem",
                    opacity: 0.8,
                    background: `rgba(${getCategoryColor(
                      contact.category
                    )}, 0.2)`,
                    padding: "0.25rem 0.75rem",
                    borderRadius: "15px",
                  }}
                >
                  {contact.category}
                </span>
              </div>
            </div>

            {/* Contact Details */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <span style={{ fontSize: "0.9rem" }}>{contact.email}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span style={{ fontSize: "0.9rem" }}>{contact.phone}</span>
              </div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                  Last contacted:{" "}
                  {new Date(contact.lastContacted).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "1.5rem",
              }}
            >
              {/* <button
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "10px",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "rgba(255, 255, 255, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
              >
                Edit
              </button> */}
              <button
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: "10px",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.background = "rgba(255, 255, 255, 0.1)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.background = "transparent")
                }
                onClick={() => {
                  fetch(
                    `http://localhost:3002/api/contacts/deletecontact/${contact._id}`,
                    {
                      method: "DELETE",
                      credentials: "include", // <-- important for auth
                    }
                  )
                    .then((res) => res.json())
                    .then((data) => {
                      if (
                        data.success ||
                        data.message === "Contact deleted successfully"
                      ) {
                        setContacts((prevContacts) =>
                          prevContacts.filter((c) => c._id !== contact._id)
                        );
                      }
                    })
                    .catch((err) => console.log(err));
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div
          style={{
            textAlign: "center",
            color: "white",
            padding: "4rem 2rem",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1rem",
              opacity: 0.5,
            }}
          >
            👥
          </div>
          <h3
            style={{
              fontSize: "1.5rem",
              marginBottom: "1rem",
            }}
          >
            No contacts found
          </h3>
          <p
            style={{
              fontSize: "1.1rem",
              opacity: 0.8,
              marginBottom: "2rem",
            }}
          >
            {searchTerm || selectedCategory !== "All"
              ? "Try adjusting your search or filters"
              : "Start building your contact network today"}
          </p>
          <button
            style={{
              padding: "1rem 2rem",
              border: "none",
              borderRadius: "50px",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
            }}
            onClick={() => {
              setShowAddModal(false);
              window.location.href = "/add-contact";
            }}
          >
            Add Your First Contact
          </button>
        </div>
      )}

      <style>{`
        input::placeholder {
          color: rgba(255, 255, 255, 0.7);
        }
        
        select option {
          background: #667eea;
          color: white;
        }
        
        @media (max-width: 768px) {
          .contacts-grid {
            grid-template-columns: 1fr;
            padding: 0 1rem;
          }
          
          .controls {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
};

export default Contacts;
