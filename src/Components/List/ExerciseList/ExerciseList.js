import React from "react";
import "./ExerciseList.css";

function ExerciseList() {
  return (
    <>
      <div className="exercise-heading">
        <img src="Images/exerciseChat.png" alt="" width="50px" height="50px" />
        <h2 className="text-small-header">Session Files</h2>
      </div>

      <div className="items">
        <h2 className="text-small-header text-green">Exercises</h2>
        <div className="item">
          <div className="item-detail">
            <img src="Images/exercisesItem.png" alt="" />
            <span className="message-text">The Diamond</span>
          </div>
          <img src="Images/downloade.png" alt="" />
        </div>
        <div className="item">
          <div className="item-detail">
            <img src="Images/exercisesItem.png" alt="" />
            <span className="message-text">Mindful Breathing</span>
          </div>
          <img src="Images/downloade.png" alt="" />
        </div>
        <div className="item">
          <div className="item-detail">
            <img src="Images/exercisesItem.png" alt="" />
            <span className="message-text">Cognitive Reframing</span>
          </div>
          <img src="Images/downloade.png" alt="" />
        </div>
        <div className="item">
          <div className="item-detail">
            <img src="Images/exercisesItem.png" alt="" />
            <span className="message-text">Body Scan Relaxation</span>
          </div>
          <img src="Images/downloade.png" alt="" />
        </div>
        <div className="item">
          <div className="item-detail">
            <img src="Images/exercisesItem.png" alt="" />
            <span className="message-text">Gratitude Journaling</span>
          </div>
          <img src="Images/downloade.png" alt="" />
        </div>

        <h2 className="text-small-header text-green">Images</h2>
        <div className="item">
          <div className="item-detail">
            <img src="Images/baad.JPG" alt="" />
            <span className="message-text">baad.JPG</span>
          </div>
          <img src="Images/downloade.png" alt="" />
        </div>
        <div className="item">
          <div className="item-detail">
            <img src="Images/baad.JPG" alt="" />
            <span className="message-text">baad.JPG</span>
          </div>
          <img src="Images/downloade.png" alt="" />
        </div>
        <div className="item">
          <div className="item-detail">
            <img src="Images/baad.JPG" alt="" />
            <span className="message-text">baad.JPG</span>
          </div>
          <img src="Images/downloade.png" alt="" />
        </div>
      </div>

      <div className="download">
        <button>Download All</button>
      </div>
    </>
  );
}

export default ExerciseList;
