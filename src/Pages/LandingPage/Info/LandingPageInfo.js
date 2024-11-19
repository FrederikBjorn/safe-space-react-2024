import React from "react";
import "./LandingPageInfo.css";

function LandingPageInfo() {
  return (
    <section className="landingPageInfo">
      <div className="container-md">
        <div className="row-content">
          <div className="item">
            <div className="pic">
              <img
                src="Images/FacilitatedRoom.png"
                alt="facRoom"
                width="161px"
                height="161px"
              />
            </div>
            <div className="text">
              <p className="text-standard text-center">
                Using diagnosis-based matchmaking to facilitate supportive
                conversations
              </p>
            </div>
          </div>

          <div className="item">
            <div className="pic">
              <img src="Images/Matchmaking.png" alt="facRoom" />
            </div>
            <div className="text">
              <p className="text-standard text-center">
                Includes a facilitated room where professional therapists guide
                and support group conversations for people with anxiety
              </p>
            </div>
          </div>
        </div>

        <div className="row-content">
          <div className="item">
            <div className="pic">
              <img
                src="Images/Exercises.png"
                alt="facRoom"
                width="161px"
                height="161px"
              />
            </div>
            <div className="text">
              <p className="text-standard text-center">
                Our psychologists provides tailored exercises specifically
                designed to help users manage anxiety effectively
              </p>
            </div>
          </div>

          <div className="item">
            <div className="pic">
              <img
                src="Images/Selftracking.png"
                alt="facRoom"
                width="161px"
                height="161px"
              />
            </div>
            <div className="text">
              <p className="text-standard text-center">
                We enable users to monitor their mental health progress through
                diaries
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingPageInfo;
