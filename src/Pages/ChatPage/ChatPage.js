import React from "react";
import "./ChatPage.css";
import List from "../../Components/List/List";
import Chat from "../../Components/Chat/Chat";
import { useUserStore } from "../../Components/UserData/useUserStore";

function ChatPage() {
  const { currentUser } = useUserStore();

  // We need to wait untill we have fetched the data from App.js. Otherwise it fails!
  if (!currentUser) {
    return;
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
