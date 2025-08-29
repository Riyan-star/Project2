import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../store/userStore";
import ConfirmModal from "./ConfirmModal";
import "../styles/styles.css";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, deleteUser } = useUserStore();
  const [user, setUser] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!id) return;

    const existingUser = users.find(u => u.id === parseInt(id));
    if (existingUser) {
      setUser(existingUser);
    } else {
      axios.get(`https://fakestoreapi.com/users/${id}`)
        .then(res => setUser(res.data))
        .catch(err => console.error("Failed to fetch user:", err));
    }
  }, [id, users]);

  if (!user) return <p style={{ textAlign: 'center', color: '#be185d', fontWeight: 'bold' }}>Loading user...</p>;

  return (
    <div className="detail-container">
      <h2>{user.username}</h2>
      <div className="detail-card user-card"><strong>Username:</strong> {user.username}</div>
      <div className="detail-card user-card"><strong>Email:</strong> {user.email}</div>
      <div className="detail-card user-card"><strong>Name:</strong> {user.name?.firstname} {user.name?.lastname}</div>
      <div className="detail-card user-card"><strong>Phone:</strong> {user.phone}</div>

      {/* Delete button opens modal */}
      <button
        onClick={() => setShowConfirm(true)}
        className="delete-btn"
      >
        Delete
      </button>

      <Link to="/" className="back-button">← Back to Users</Link>

      {showConfirm && (
        <ConfirmModal
          message={`Are you sure you want to delete ${user.username}?`}
          onConfirm={() => {
            deleteUser(user.id);
            setShowConfirm(false);
            navigate("/"); // go back to list after delete
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}

export default UserDetail;
