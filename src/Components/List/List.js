import React, { useEffect, useState } from "react";
import "./List.css";
import useRetrieveMedia from "./useFunctions/useRetrieveMedia";

function List() {
  const { retrieveMedia } = useRetrieveMedia();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const run = async () => {
      const media = await retrieveMedia();
      setImages(media.images);
      setFiles(media.files);
    };
    run();

    return () => {
      setFiles([]);
      setImages([]);
    };
  }, []);

  const handleDownload = (url) => {
    try {
      window.open(url, "_blank"); // Opens the URL in a new tab
    } catch (error) {
      console.error("Error opening file in new tab:", error);
    }
  };

  const formatName = (name) => {
    return name.split("_").slice(1).join("_");
  };

  return (
    <div className="list">
      <div className="exercise-heading">
        <img src="Images/exerciseChat.png" alt="" width="50px" height="50px" />
        <h2 className="text-small-header">Session Files</h2>
      </div>

      <ul className="items">
        <h2 className="text-small-header text-green">Exercises</h2>
        {files.map((file) => (
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
              onClick={() => handleDownload(file.url)}
            />
          </li>
        ))}

        <h2 className="text-small-header text-green">Images</h2>
        {images.map((image) => (
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
        ))}
      </ul>

      <div className="download">
        <button>Download All</button>
      </div>
    </div>
  );
}

export default List;
