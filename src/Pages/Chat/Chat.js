import React from "react";
import "./Chat.css";
import { ChatSetup } from "../../Components/ChatSetup";

function Chat() {
  return (
    <section className="chat">
      <h3> Chat </h3>

      <ChatSetup />
    </section>
  );
}

export default Chat;
