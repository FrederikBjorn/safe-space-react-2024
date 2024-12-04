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
        <div
          key={message.id}
          className={`message ${message.isOwnMessage ? "own" : ""}`}
        >
          {!message.isOwnMessage && <img src={message.profilePic} alt="" />}
          <div className="texts">
            {message.img && (
              <a href={message.img.url()} target="_blank" download>
                <img src={message.img.url()} alt="" />
              </a>
            )}
            {message.file && (
              <div className="file-text">
                <a
                  href={message.file.url()}
                  download={message.file.name().split("_").slice(1).join("_")}
                  target="_blank"
                >
                  <img src="Images/exercisesItem.png" alt="" />
                  <p className="message-text">
                    {message.file.name().split("_").slice(1).join("_")}
                  </p>
                </a>
              </div>
            )}
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
