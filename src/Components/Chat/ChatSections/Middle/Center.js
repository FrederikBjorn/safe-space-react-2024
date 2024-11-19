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
  }, []);

  return (
    <div className="center">
      <div key={"woop"} className="message">
        <img src="Images/avatar.png" alt="" />
        <div className="texts">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            aliquid beatae iusto facilis. Neque delectus dignissimos fuga
            numquam quo, maiores iusto maxime, quia enim vitae culpa, rerum
            ducimus rem consequatur?
          </p>
          <span>1 min ago</span>
        </div>
      </div>

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
