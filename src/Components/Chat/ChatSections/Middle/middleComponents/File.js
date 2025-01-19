import React from "react";

function File({ message }) {
  return (
    <div className="file-text">
      <a href={message.file.url()} target="_blank" download>
        <img src="Images/exercisesItem.png" alt="" />
        <p className="message-text">
          {message.file.name().split("_").slice(1).join("_")}
        </p>
      </a>
    </div>
  );
}

export default File;
