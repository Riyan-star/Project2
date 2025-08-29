// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import useUserStore from "../store/userStore";
import '../styles/styles.css';

function Navbar() {
  const [showForm, setShowForm] = useState(false);
  const { createUser } = useUserStore();

  // Lock background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = showForm ? "hidden" : "auto";
  }, [showForm]);

  return (
    <>
      <nav className="navbar">
        <Link to="/">User Dashboard</Link>
        <div>
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              backgroundColor: "#f9a8d4",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Add User
          </button>
        </div>
      </nav>

      {showForm && (
        <div 
          className="modal-overlay" 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <UserForm
            onClose={() => setShowForm(false)}
            onSubmit={(userData) => {
              createUser(userData);
              setShowForm(false);
            }}
          />
        </div>
      )}
    </>
  );
}

export default Navbar;