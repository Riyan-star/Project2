import React, { useState } from "react";
import { Link } from "react-router-dom";
import useUserStore from "../store/userStore";
import UserForm from "./UserForm";
import ConfirmModal from "./ConfirmModal";
import "../styles/styles.css";

function UserCard({ user }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const deleteUser = useUserStore((state) => state.deleteUser);

  return (
    <>
      <div className="card user-card">
        <Link to={user.id ? `/users/${user.id}` : "#"} className="user-card-link">
          <p><strong>Username:</strong> {user.username || "N/A"}</p>
          <p><strong>Email:</strong> {user.email || "N/A"}</p>
          <p><strong>Name:</strong> {user.name?.firstname || ""} {user.name?.lastname || ""}</p>
        </Link>

        {/* Edit button */}
        <button
          onClick={() => setShowEditForm(true)}
          className="edit-btn"
        >
          Edit
        </button>

        {/* Delete button */}
        <button
          onClick={() => setShowConfirm(true)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>

      {showEditForm && (
        <UserForm
          user={user}
          onClose={() => setShowEditForm(false)}
        />
      )}

      {showConfirm && (
        <ConfirmModal
          message={`Are you sure you want to delete ${user.username}?`}
          onConfirm={() => {
            deleteUser(user.id);
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}

export default UserCard;
