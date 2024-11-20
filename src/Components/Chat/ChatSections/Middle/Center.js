import React, { useEffect, useRef, useState } from "react";
import "./Center.css";
import useRetrieveChatMessages from "../../useFunctions/useRetrieveChatMessages";
import Parse from "parse";
import { useUserStore } from "../../../UserData/useUserStore";

function Middle() {
  const endRef = useRef(null);
  const { getMessages } = useRetrieveChatMessages();
  const [messages, setMessages] = useState([]);
  const { currentUser } = useUserStore();

  useEffect(() => {
    console.log("HOOK: I run the message");
    const fetchMessages = async () => {
      const retrievedMessages = await getMessages();
      setMessages(retrievedMessages);
    };

    fetchMessages();
  }, [getMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    async function run() {
      console.log("Run function called");
      let chatQuery = new Parse.Query("chat");
      chatQuery.equalTo("objectId", "3AiMWfir5C");
      try {
        let subscription = await chatQuery.subscribe();

        subscription.on("open", () => {
          console.log("SUBSCRIPTION OPEN");
        });

        subscription.on("update", async (chat) => {
          const messages = chat.get("messages");
          const messagePointer = messages[messages.length - 1];
          const message = await messagePointer.fetch();

          const sendUserId = message.get("sender_user").id;

          const userProfileQuery = new Parse.Query("user_profile");
          userProfileQuery.equalTo("objectId", sendUserId);

          const userProfile = await userProfileQuery.first();

          const text = message.get("text");
          const createdAt = message.get("createdAt");
          const profilePic = userProfile.get("profile_pic").url();
          const isOwnMessage =
            message.get("sender_user").id === currentUser.userId;

          setMessages((messages) => {
            // Check if the message already exists
            const messageExists = messages.some(
              (msg) => msg.createdAt === createdAt && msg.text === text
            );

            if (!messageExists) {
              console.log("SUB: i run the message");
              return [
                ...messages,
                { id: message.id, text, createdAt, profilePic, isOwnMessage },
              ];
            }

            return messages;
          });

          console.log("Text: " + text);
          console.log("Created At: " + createdAt);
          console.log("Profile Picture: " + profilePic);
        });
      } catch (error) {
        console.log("error");
      }
    }

    run();
  }, [currentUser]);

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
