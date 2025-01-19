import React from "react";

function Img({ message }) {
  return (
    <a href={message.img.url()} target="_blank" download>
      <img src={message.img.url()} alt="" />
    </a>
  );
}

export default Img;
