import React, { useState } from "react";
import Parse from "parse";
import "./AdminPage.css";

export default function AdminPage() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    fullName: "",
    role: "",
  });

  const addUser = async () => {
    try {
      const newUser = new Parse.User();
      newUser.set("username", user.userName);
      newUser.set("password", user.password);
      newUser.set("email", user.email);
      newUser.set("fullName", user.fullName);
      newUser.set("role", user.role);

      await newUser.signUp();
      alert(user.role + " user added successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Panel</h1>

      {/* Form for adding Patient User */}
      <h2>Add Patient/Professional User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addUser();
        }}
      >
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={user.userName}
          onChange={(e) => setUser({ ...user, userName: e.target.value })}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={user.fullName}
          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
          required
        />
        <select
          name="role"
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          required
        >
          <option value="" disabled>
            Choose role
          </option>
          <option value="patient">Patient</option>
          <option value="professional">Professional</option>
        </select>
        <input type="hidden" name="role" value="patient" />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}
