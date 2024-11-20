import React, { useEffect, useRef, useState } from "react";
import "./Center.css";
import useRetrieveChatMessages from "../../useFunctions/useRetrieveChatMessages";

function Middle() {
  const endRef = useRef(null);
  const { getMessages } = useRetrieveChatMessages();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const retrievedMessages = await getMessages();
      setMessages(retrievedMessages);
    };

    fetchMessages();
  }, [getMessages]);

  useEffect(() => {
    endRef.current?.scrollIntoView();
  }, [messages]);

  return (
    <div className="center">
      {messages?.map((message) => (
        <div
          key={`${message.objectId}-${message.createdAt}`}
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
