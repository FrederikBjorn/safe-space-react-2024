import React from "react";
import Img from "./Img";
import File from "./File";

function Message({ message }) {
  return (
    <div
      key={message.id}
      className={`message ${message.isOwnMessage ? "own" : ""}`}
    >
      {!message.isOwnMessage && <img src={message.profilePic} alt="" />}
      <div className="texts">
        {message.img && <Img message={message} />}
        {message.file && <File message={message} />}
        {message.text && <p className="message-text">{message.text}</p>}
        <span>{new Date(message.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default Message;
