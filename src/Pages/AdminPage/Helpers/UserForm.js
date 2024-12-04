import React, { useEffect, useState } from "react";
import Parse from "parse";
import "../AdminPage.css";

function UserForm({ user, setUser, addUser }) {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    async function fetchChats() {
      try {
        const chatQuery = new Parse.Query("chat");
        const chats = await chatQuery.find();

        const chatData = chats.map((chat) => ({
          id: chat.id,
          chatNumber: chat.get("chat_number"),
        }));
        setChatRooms(chatData);
      } catch (error) {
        console.error("Error fetching chat rooms:", error);
      }
    }
    fetchChats();
    return () => {
      setChatRooms([]);
    };
  }, []);

  return (
    <div className="forms">
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

        <select
          name="chatRoom"
          value={user.chatId}
          onChange={(e) => setUser({ ...user, chatId: e.target.value })}
          required
        >
          <option value="" disabled>
            Choose chat room
          </option>
          {chatRooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.chatNumber}
            </option>
          ))}
        </select>

        <input
          type="file"
          name="profilePic"
          onChange={(e) => setUser({ ...user, profilePic: e.target.files[0] })}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserForm;
