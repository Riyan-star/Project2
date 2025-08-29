import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserForm from "./UserForm";
import '../styles/styles.css';

function UserCard({ user }) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <div className="card user-card">
        <Link to={user.id ? `/users/${user.id}` : "#"} className="user-card-link">
          <p><strong>Username:</strong> {user.username || "N/A"}</p>
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <p><strong>Name:</strong> {user.name?.firstname || ""} {user.name?.lastname || ""}</p>
        </Link>

        <button
          onClick={() => setShowEditForm(true)}
          style={{
            marginTop: '10px',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            backgroundColor: '#f9a8d4',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Edit
        </button>
      </div>

      {showEditForm && (
        <UserForm
          user={user}
          onClose={() => setShowEditForm(false)}
        />
      )}
    </>
  );
}

export default UserCard;