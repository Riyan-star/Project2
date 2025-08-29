import React, { useState, useEffect } from "react";
import useUserStore from "../store/userStore";
import '../styles/styles.css';

//  adding/editing user

function UserForm({ user = null, onClose }) {
  const { createUser, updateUser } = useUserStore();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });

//keep track of user data if editing in the form input

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || "",
        username: user.username || "",
        password: user.password || "",
        firstname: user.name?.firstname || "",
        lastname: user.name?.lastname || "",
      });
    }
  }, [user]);

  //Update form data on input change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      name: { firstname: formData.firstname, lastname: formData.lastname },
    };

    if (user) {
      await updateUser(user.id, payload);
    } else {
      await createUser(payload);
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{user ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} required />
          <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} required />
          <div className="form-buttons">
            <button type="submit">{user ? "Update User" : "Create User"}</button>
            <button type="button" onClick={onClose} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserForm;