import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import useUserStore from "../store/userStore";
import '../styles/styles.css';

function UserDetail() {
  const { id } = useParams();
  const { users } = useUserStore();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!id) return; // skip if id is missing

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
      <Link to="/" className="back-button">← Back to Users</Link>
    </div>
  );
}

export default UserDetail;