import React, { useState } from "react";
import "./Bottom.css";
import SendIcon from "../../../lib/SendIcon";
import EmojiPicker from "emoji-picker-react";
import useUpdateChatMessages from "../../useFunctions/useUpdateChatMessages";

function Bottom() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const { updateMessages } = useUpdateChatMessages();

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if (text === "") {
      return;
    }
    updateMessages(text);
    setText("");
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bottom">
      <img src="Images/attach.png" alt="" />
      <div className="input-box">
        <input
          className="message-text"
          type="text"
          value={text}
          placeholder="Type your message"
          onChange={(e) => setText(e.target.value)}
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
