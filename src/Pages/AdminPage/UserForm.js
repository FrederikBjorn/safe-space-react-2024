import React from "react";

function UserForm({ user, setUser, addUser }) {
  return (
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
      <input
        type="file"
        name="profilePic"
        onChange={(e) => setUser({ ...user, profilePic: e.target.files[0] })}
      />
      <button type="submit">Add User</button>
    </form>
  );
}

export default UserForm;
