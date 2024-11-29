import React from "react";
import "./ChatPage.css";
import List from "../../Components/List/List";
import Chat from "../../Components/Chat/Chat";
import { useUserStore } from "../../Components/UserData/useUserStore";

function ChatPage() {
  const { currentUser } = useUserStore();

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <section className="chat-page">
      <div className="chat-page-container">
        <List />
        <Chat />
      </div>
    </section>
  );
}

export default ChatPage;
