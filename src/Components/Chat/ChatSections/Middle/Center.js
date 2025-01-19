import React, { useEffect, useRef, useState } from "react";
import "./Center.css";
import Parse from "parse";
import { useUserStore } from "../../../UserData/useUserStore";
import useRetrieveAllChatMessages from "../../useFunctions/useRetrieveAllChatMessages";
import useRetrieveLatestChatMessage from "../../useFunctions/useRetrieveLatestChatMessage";
import Message from "./middleComponents/Message";

function Middle() {
  const endRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { currentUser } = useUserStore();
  const { retrieveAllChatMessages } = useRetrieveAllChatMessages();
  const { retrieveLatestChatMessage } = useRetrieveLatestChatMessage();

  //play sound
  const playSound = () => {
    const recivedMessageAudio = new Audio("/Audio/msg_tone_1.wav");
    recivedMessageAudio
      .play()
      .catch((error) => console.error("error playing audio", error));
  };

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    let subscription;

    const run = async () => {
      const chatPointer = new Parse.Object("chat");
      chatPointer.id = currentUser.chatId;

      // Here, I get the messages pointing towards the current chatId and sort it
      let messagesQuery = new Parse.Query("message");
      messagesQuery.equalTo("chat", chatPointer);
      messagesQuery.ascending("createdAt");

      try {
        subscription = await messagesQuery.subscribe();

        subscription.on("open", async () => {
          const messagesWithSenderInfo = await retrieveAllChatMessages(
            messagesQuery,
            currentUser
          );
          setMessages(messagesWithSenderInfo);
        });

        subscription.on("create", async (message) => {
          const { id, text, createdAt, profilePic, isOwnMessage, img, file } =
            await retrieveLatestChatMessage(message, currentUser);

          //insert sound object
          if (!isOwnMessage) {
            playSound();
            console.log("playing sound");
          }

          setMessages((prevMessages) => {
            if (prevMessages.some((msg) => msg.id === id)) {
              return prevMessages;
            }
            return [
              ...prevMessages,
              { id, text, createdAt, profilePic, isOwnMessage, img, file },
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
  }, []);

  return (
    <div className="center">
      {messages?.map((message) => (
        <Message message={message} />
      ))}
      <div ref={endRef} />
    </div>
  );
}

export default Middle;
