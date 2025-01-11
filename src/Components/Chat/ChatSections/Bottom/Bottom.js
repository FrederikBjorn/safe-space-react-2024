import React, { useState } from "react";
import "./Bottom.css";
import SendIcon from "../../../lib/SendIcon";
import EmojiPicker from "emoji-picker-react";
import useUpdateChatMessages from "../../useFunctions/useUpdateChatMessages";

function Bottom() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { updateMessages } = useUpdateChatMessages();
  const [img, setImg] = useState({ file: null, url: "" });
  const [file, setFile] = useState({ file: null });

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFile({
        file: e.target.files[0],
      });
    }
  };

  const handleSend = async () => {
    if (text === "") {
      return;
    }
    updateMessages(text, img, file);
    setText("");
    setImg({
      file: null,
      url: "",
    });
    setFile({
      file: null,
    });
    try {
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteImg = () => {
    setImg({ file: null, url: null });
  };

  const handleDeleteFile = () => {
    setFile({ file: null });
  };

  return (
    <div className="bottom">
      <div className="left">
        <label htmlFor="image">
          <img src="Images/image.png" alt="" />
        </label>
        <input type="file" id="image" onChange={handleImg} />
        <label htmlFor="file">
          <img src="Images/add2.png" alt="" />
        </label>
        <input type="file" id="file" onChange={handleFile} />
      </div>
      <div className="input-box">
        {img.url && <img src={img.url} alt="" onClick={handleDeleteImg} />}
        {file.file && (
          <img
            src="Images/exercisesItem.png"
            alt=""
            onClick={handleDeleteFile}
          />
        )}
        <input
          className="message-text"
          type="text"
          value={text}
          placeholder="Type your message"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />
        <div className="emoji">
          <img
            className="emoji"
            src="Images/emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
      </div>
      <button onClick={handleSend}>
        <SendIcon />
      </button>
    </div>
  );
}

export default Bottom;
