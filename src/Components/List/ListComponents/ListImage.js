import React from "react";

function ListImage({image, handleDownload, formatName}) {
  return (
    <li key={image.id} className="item">
      <div className="item-detail">
        <img src={image.url()} alt={image.name()} />
        <span
          className="message-text"
          onClick={() => handleDownload(image.url())}
        >
          {formatName(image.name())}
        </span>
      </div>
      <img
        src="Images/downloade.png"
        alt=""
        onClick={() => handleDownload(image.url())}
      />
    </li>
  );
}

export default ListImage;
