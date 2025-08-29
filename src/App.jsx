import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import Navbar from "./components/Navbar";
import UserForm from "./components/UserForm";
import './styles/styles.css';

function App() {
  return (
    <Router>
  <Navbar />
  <Routes>
    <Route path="/" element={<UserList />} />
    <Route path="/users/:id" element={<UserDetail />} />
  </Routes>
</Router>

  );
}

export default App;