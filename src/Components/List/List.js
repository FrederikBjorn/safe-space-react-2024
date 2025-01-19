import React, { useEffect, useState } from "react";
import "./List.css";
import useRetrieveMedia from "./useFunctions/useRetrieveMedia";
import Parse from "parse";
import { useUserStore } from "../UserData/useUserStore";
import ListFile from "./ListComponents/ListFile";
import ListImage from "./ListComponents/ListImage";

function List() {
  const { retrieveMedia } = useRetrieveMedia();
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const { currentUser } = useUserStore();

  const formatName = (name) => {
    return name.split("_").slice(1).join("_");
  };

  useEffect(() => {
    let subscription;

    const run = async () => {
      const chatPointer = new Parse.Object("chat");
      chatPointer.id = currentUser.chatId;

      let messagesQuery = new Parse.Query("message");
      messagesQuery.equalTo("chat", chatPointer);
      messagesQuery.ascending("createdAt");

      try {
        subscription = await messagesQuery.subscribe();

        subscription.on("open", async () => {
          const media = await retrieveMedia();
          setImages(media.images);
          setFiles(media.files);
        });

        subscription.on("create", async (message) => {
          if (message.has("image")) {
            console.log("In Images");
            setImages((prevImages) => {
              if (!prevImages) prevImages = [];
              const newImage = message.get("image");
              if (
                prevImages.some(
                  (img) =>
                    formatName(img.name()) === formatName(newImage.name())
                )
              ) {
                console.log("No new image");
                return prevImages;
              }
              return [...prevImages, newImage];
            });
          }
          if (message.has("file")) {
            setFiles((prevFiles) => {
              if (!prevFiles) prevFiles = [];
              const newFile = message.get("file");
              if (
                prevFiles.some(
                  (file) =>
                    formatName(file.name()) === formatName(newFile.name())
                )
              ) {
                return prevFiles;
              }
              return [...prevFiles, newFile];
            });
          }
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

  const handleDownload = (url) => {
    try {
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error opening file in new tab:", error);
    }
  };

  const clearEverything = () => {
    setFiles([]);
    setImages([]);
  };

  return (
    <div className="list">
      <div className="exercise-heading">
        <img src="Images/exerciseChat.png" alt="" width="50px" height="50px" />
        <h2 className="text-small-header">Session Files</h2>
      </div>

      <ul className="items">
        {files && files.length > 0 && (
          <>
            <h2 className="text-small-header text-green">Exercises</h2>
            {files.map((file) => (
              <ListFile
                file={file}
                handleDownload={handleDownload}
                formatName={formatName}
              />
            ))}
          </>
        )}

        {images && images.length > 0 && (
          <>
            <h2 className="text-small-header text-green">Images</h2>
            {images.map((image) => (
              <ListImage
                image={image}
                handleDownload={handleDownload}
                formatName={formatName}
              />
            ))}
          </>
        )}
      </ul>

      <div className="download">
        <button
          onClick={() => {
            clearEverything();
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default List;
