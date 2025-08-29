import React from "react";
import "../styles/styles.css";

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p style={{ fontWeight: "bold", color: "#4a001f", marginBottom: "1rem" }}>
          {message}
        </p>
        <div className="form-buttons">
          <button onClick={onConfirm} className="delete-btn">
            Yes, Delete
          </button>
          <button onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
