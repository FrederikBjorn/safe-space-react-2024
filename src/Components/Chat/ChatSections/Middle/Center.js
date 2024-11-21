import React, { useEffect, useRef, useState } from "react";
import "./Center.css";
import Parse from "parse";
import { useUserStore } from "../../../UserData/useUserStore";
import useRetrieveAllChatMessages from "../../useFunctions/useRetrieveAllChatMessages";
import useRetrieveLatestChatMessage from "../../useFunctions/useRetrieveLatestChatMessage";

function Middle() {
  const endRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useUserStore();
  const { retrieveAllChatMessages } = useRetrieveAllChatMessages();
  const { retrieveLatestChatMessage } = useRetrieveLatestChatMessage();

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    let subscription;

    const run = async () => {
      console.log("RUN FUNCTION IS CALLED");
      let chatQuery = new Parse.Query("chat");
      chatQuery.equalTo("objectId", currentUser.chatId);

      try {
        subscription = await chatQuery.subscribe();

        subscription.on("open", async () => {
          console.log("SUBSCRIPTION OPEN");
          const messagesWithSenderInfo = await retrieveAllChatMessages(
            chatQuery,
            currentUser
          );
          setMessages(messagesWithSenderInfo);
          console.log("Messages fetched");
        });

        subscription.on("update", async (chat) => {
          console.log("Retrieving the latest message");
          const { id, text, createdAt, profilePic, isOwnMessage } =
            await retrieveLatestChatMessage(chat, currentUser);

          setMessages((prevMessages) => {
            if (prevMessages.some((msg) => msg.id === id)) {
              console.log("Set Messages is called many times");
              return prevMessages;
            }
            console.log("New message is retrieved");
            return [
              ...prevMessages,
              { id, text, createdAt, profilePic, isOwnMessage },
            ];
          });
        });
      } catch (error) {
        console.error("Error during subscription setup:", error);
      }
    };

    run();

    return () => {
      subscription?.unsubscribe();
    };
  }, [currentUser, retrieveAllChatMessages, retrieveLatestChatMessage]);

  return (
    <div className="center">
      {messages?.map((message) => (
        <div
          key={message.id}
          className={`message ${message.isOwnMessage ? "own" : ""}`}
        >
          {!message.isOwnMessage && <img src={message.profilePic} alt="" />}
          <div className="texts">
            <p className="message-text">{message.text}</p>
            <span>{new Date(message.createdAt).toLocaleString()}</span>
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}

export default Middle;
