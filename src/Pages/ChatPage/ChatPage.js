import React from "react";
import "./ChatPage.css";
import List from "../../Components/List/List";
import Chat from "../../Components/Chat/Chat";

function ChatPage() {
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
