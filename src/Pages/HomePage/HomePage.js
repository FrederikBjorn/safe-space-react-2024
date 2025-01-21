import React from "react";
import "./HomePage.css";
import { useUserStore } from "../../Components/UserData/useUserStore";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { currentUser } = useUserStore();
  const navigate = useNavigate();

  // We need to wait untill we have fetched the data from App.js. Otherwise it fails!
  if (!currentUser) {
    return;
  }

  return (
    <div className="home-hero bg-blue">
      <img src="Images/hand1.png" alt="hand1" className="hand-one" />
      <img src="Images/hand2.png" alt="hand2" className="hand-two" />
      <div className="container">
        <h1>Welcome back, {currentUser.fullName.split(" ")[0]}!</h1>
        <p>What do you want to do today?</p>

        <div className="navigations">
          <div className="item">
            <div
              className="icon chat-icon"
              onClick={() => navigate("/chatpage")}
            ></div>
            <p>Chat</p>
          </div>

          <div className="item">
            <div
              className="icon diary-icon"
              onClick={() => navigate("/diarypage")}
            ></div>
            <p>Diary</p>
          </div>
        </div>
        <div className="navigations">
          <div className="item">
            <div
              className="icon calendar-icon"
              onClick={() => navigate("/calendarpage")}
            ></div>
            <p>Calendar</p>
          </div>

          <div className="item">
            <div
              className="icon exercises-icon"
              onClick={() => navigate("/exercisespage")}
            ></div>
            <p>Exercises</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
