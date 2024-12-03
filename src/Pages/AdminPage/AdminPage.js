import React, { useState } from "react";
import "./AdminPage.css";
import Parse from "parse";
import UserForm from "./UserForm";
import { useUserLogOut } from "../../Components/Authentication/useUserLogOut";
import { useCreateChat } from "./useCreateChat";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const { userLogOut } = useUserLogOut();
  const { createChat } = useCreateChat();
  const navigate = useNavigate();
  const adminId = process.env.REACT_APP_PARSE_ADMIN_ID;

  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    fullName: "",
    role: "",
    profilePic: null,
    chatId: "",
  });

  if (Parse.User.current().id !== adminId) {
    alert("YOU ARE NOT THANOS");
    navigate("/");
    userLogOut();
  }

  const addUser = async () => {
    try {
      const currentUser = Parse.User.current();
      const currentSessionToken = currentUser.getSessionToken();

      // Setting up new user!!
      const newUser = new Parse.User();
      newUser.set("username", user.userName);
      newUser.set("password", user.password);
      newUser.set("email", user.email);
      newUser.set("fullName", user.fullName);
      newUser.set("role", user.role);

      await newUser.signUp();
      alert(user.role + " user added successfully!");

      // Ensuring that the current user is still Thanos and not new user!!
      await Parse.User.become(currentSessionToken);

      // Adding new user to chat ACL!
      const chatQuery = new Parse.Query("chat");
      const chat = await chatQuery.get(user.chatId);
      const chatAcl = (await chat.getACL()) || new Parse.ACL();

      chatAcl.setReadAccess(newUser, true);
      chatAcl.setWriteAccess(newUser, true);
      chat.setACL(chatAcl);

      // Creating user profile with first name and profile picture!
      const userProfile = new Parse.Object("user_profile");
      userProfile.set("user", newUser.toPointer());
      userProfile.set("firstName", user.fullName.split(" ")[0]);

      userProfile.set("chat", chat);

      if (user.profilePic) {
        const parseFile = new Parse.File(user.profilePic.name, user.profilePic);
        await parseFile.save();
        userProfile.set("profile_pic", parseFile);
      } else {
        console.log("No profile pic found.");
      }

      await userProfile.save();
      console.log("User profile saved successfully.");
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Error details:", error);
    }
  };

  return (
    <div className="admin-page">
      <button onClick={() => userLogOut()}>Log Out</button>
      <button onClick={() => createChat()}>Create Chat</button>

      <h1>Admin Panel</h1>

      {/* Form for adding Patient User */}
      <h2>Add Patient/Professional User</h2>
      <UserForm user={user} setUser={setUser} addUser={addUser} />
    </div>
  );
}

export default AdminPage;
