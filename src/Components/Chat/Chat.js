import React from "react";
import "./Chat.css";
import Top from "./ChatSections/Top/Top";
import Center from "./ChatSections/Middle/Center";
import Bottom from "./ChatSections/Bottom/Bottom";
import { useUserStore } from "../UserData/useUserStore";

function Chat() {
  const { currentUser, setIsLoadingTrue } = useUserStore();

  // Ensure that we retrieve user information before loading the page!!!
  if (!currentUser) {
    setIsLoadingTrue();
    return null;
  }

  return (
    <div className="chat">
      <Top />
      <Center />
      <Bottom />
    </div>
  );
}

export default Chat;
