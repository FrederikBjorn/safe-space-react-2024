import React from "react";
import "./Top.css";
import { useUserStore } from "../../../UserData/useUserStore";

function Top() {
  const { currentUser } = useUserStore();

  return (
    <div className="top">
      <img src={currentUser.profilePicUrl} alt="" />
      <div className="text">
        <h2 className="text-small-header">
          Session of {currentUser.fullName.split(" ")[0]}
        </h2>
        <p className="small-text">
          {"Online with: " + currentUser.otherUserFirstNames.join(", ")}
        </p>
      </div>
    </div>
  );
}

export default Top;
