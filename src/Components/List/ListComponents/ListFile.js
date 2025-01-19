import React from "react";

function ListFile({ file, handleDownload, formatName }) {
  return (
    <li key={file.id} className="item">
      <div className="item-detail">
        <img src="Images/exercisesItem.png" alt="" />
        <span
          className="message-text"
          onClick={() => handleDownload(file.url())}
        >
          {formatName(file.name())}
        </span>
      </div>
      <img
        src="Images/downloade.png"
        alt=""
        onClick={() => handleDownload(file.url())}
      />
    </li>
  );
}

export default ListFile;
