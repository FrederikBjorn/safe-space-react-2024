import React, { useState } from "react";
import "./AdminPage.css";
import Parse from "parse";
import UserForm from "./Helpers/UserForm";
import { useUserLogOut } from "../../Components/Authentication/useUserLogOut";
import { useCreateChat } from "./Helpers/useCreateChat";
import { useNavigate } from "react-router-dom";
import useUserSignUp from "../../Components/Authentication/useUserSignUp";

function AdminPage() {
  const { userLogOut } = useUserLogOut();
  const { createChat } = useCreateChat();
  const { userSignUp } = useUserSignUp();
  const navigate = useNavigate();
  const adminId = process.env.REACT_APP_PARSE_ADMIN_ID;

  if (Parse.User.current().id !== adminId) {
    alert("YOU ARE NOT THANOS");
    navigate("/");
    userLogOut();
  }

  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    fullName: "",
    role: "",
    profilePic: null,
    chatId: "",
  });

  async function addUser() {
    userSignUp(user);
  }

  return (
    <div className="admin-page">
      <div className="log-out">
        <button onClick={() => userLogOut()}>Log Out</button>
      </div>
      <div className="create-chat">
        <button onClick={() => createChat()}>Create Chat</button>
      </div>

      {/* Form for adding Patient User */}
      <div className="signup-square container-sm bg-white">
        <h1>Admin Panel</h1>
        <h2>Add Patient/Professional User</h2>
        <UserForm user={user} setUser={setUser} addUser={addUser} />
      </div>
    </div>
  );
}

export default AdminPage;
