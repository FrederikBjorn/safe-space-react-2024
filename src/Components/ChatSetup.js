import React, { useState } from "react";
import "./ChatSetup.css";
import { Button, Input } from "antd";
import Parse, { Query } from "parse";
import { LiveChat } from "./LiveChat";
import "../../src/App.css";
import userEvent from "@testing-library/user-event";

export const ChatSetup = () => {
  // State variables holding input values and results
  const [senderUserNameInput, setSenderUserNameInput] = useState("");
  const [senderObjectId, setSenderObjectId] = useState(null);
  const [receiverUserNameInput, setReceiverUserNameInput] = useState("");
  const [receiverObjectId, setReceiverObjectId] = useState(null);

  // Create or retrieve Nickname objects and start LiveChat component
  const startLiveChat = async () => {
    const senderUserName = senderUserNameInput;
    const recevierUserName = receiverUserNameInput;

    // Check if user informed both nicknames
    if (senderUserName === null || recevierUserName === null) {
      alert("Please inform both sender and receiver usernames!");
      return false;
    }

    /*    // Check if sender nickname already exists, if not create new parse object
    let senderUserNameObject = null;
    try {
      const senderParseQuery = new Parse.Query("_User");
      senderParseQuery.equalTo("username", senderUserName);
      const senderParseQueryResult = await senderParseQuery.first();
      console.log("sender User Name", senderUserName);
      if (
        senderParseQueryResult !== undefined &&
        senderParseQueryResult !== null
      ) {
        console.log("senderParseQueryResult = null");
        senderUserNameObject = senderParseQueryResult;
      } else {
        senderUserNameObject = new Parse.Object("_User");
        senderUserNameObject.set("username", senderUserName);
        senderUserNameObject = await senderUserNameObject.save();
        console.log("senderusernameobject = ", senderUserNameObject);
      }
    } catch (error) {
      alert(error);
      return false;
    }

  // Check if receiver nickname already exists, if not create new parse object
    let receiverUserNameObject = null;
    try {
      const receiverParseQuery = new Parse.Query("_User");
      receiverParseQuery.equalTo("username", recevierUserName);
      const receiverParseQueryResult = await receiverParseQuery.first();
      if (
        receiverParseQueryResult !== undefined &&
        receiverParseQueryResult !== null
      ) {
        receiverUserNameObject = receiverParseQueryResult;
      } else {
        receiverUserNameObject = new Parse.Object("_User");
        receiverUserNameObject.set("username", recevierUserName);
        receiverUserNameObject = await receiverUserNameObject.save();
      }
    } catch (error) {
      alert(error);
      return false;
    }
*/

    // Set nickname objects ids, so live chat component is instantiated
    const currentUser = Parse.User.current();
    const query = new Parse.Query(Parse.User);

    console.log("recevierUserName: ", recevierUserName);

    query.equalTo("username", recevierUserName);
    const user = await query.first();

    console.log("query returns: ", query);

    if (user) {
      setSenderObjectId(currentUser.id);
      setReceiverObjectId(user.id);
      return user;
    } else {
      console.log("User not found");
      return null;
    }
  };

  return (
    <div>
      <div className="header">
        <img
          className="header_logo"
          alt="Back4App Logo"
          src={
            "https://blog.back4app.com/wp-content/uploads/2019/05/back4app-white-logo-500px.png"
          }
        />
        <p className="header_text_bold">{"React on Back4App"}</p>
        <p className="header_text">{"Live query chat app"}</p>
      </div>
      <div className="container">
        {senderObjectId === null && receiverObjectId === null && (
          <div>
            <Input
              className="form_input"
              value={senderUserNameInput}
              onChange={(event) => setSenderUserNameInput(event.target.value)}
              placeholder={"Sender (Your) Nickname"}
              size="large"
            />
            <Input
              className="form_input"
              value={receiverUserNameInput}
              onChange={(event) => setReceiverUserNameInput(event.target.value)}
              placeholder={"Receiver (Their) Nickname"}
              size="large"
            />
            <Button
              type="primary"
              className="form_button"
              color={"#208AEC"}
              size={"large"}
              onClick={startLiveChat}
            >
              Start live chat
            </Button>
          </div>
        )}
        {senderObjectId !== null && receiverObjectId !== null && (
          <LiveChat
            senderUserName={senderUserNameInput}
            senderObjectId={senderObjectId}
            recevierUserName={receiverUserNameInput}
            receiverObjectId={receiverObjectId}
          />
        )}
      </div>
    </div>
  );
};
