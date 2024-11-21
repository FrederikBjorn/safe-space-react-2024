import React, { useState } from "react";
import "./AdminPage.css";
import Parse from "parse";
import UserForm from "./UserForm";

function AdminPage() {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    fullName: "",
    role: "",
    profilePic: null,
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
      const userProfile = new Parse.Object("user_profile");
      userProfile.set("user", newUser.toPointer());
      userProfile.set("firstName", user.fullName.split(" ")[0]);

      if (user.profilePic) {
        console.log("Profile pic found:", user.profilePic);
        const parseFile = new Parse.File(user.profilePic.name, user.profilePic);
        await parseFile.save();
        console.log("Profile pic saved:", parseFile);
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
      <h1>Admin Panel</h1>

      {/* Form for adding Patient User */}
      <h2>Add Patient/Professional User</h2>
      <UserForm user={user} setUser={setUser} addUser={addUser} />
    </div>
  );
}

export default AdminPage;