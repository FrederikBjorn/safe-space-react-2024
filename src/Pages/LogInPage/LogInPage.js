import React, { useState } from "react";
import "./LogInPage.css";
import useUserLogIn from "../../Components/Authentication/useUserLogIn";

function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userLogIn } = useUserLogIn();

  return (
    <form
      className="loginForm"
      onSubmit={(e) => {
        e.preventDefault();
        userLogIn(username, password);
      }}
    >
      <div className="login-square container-sm bg-white">
        <h2 className="login-header text-header">Log in</h2>

        <div className="forms">
          <div className="form-container">
            <input
              className="userName message-text bg-white"
              type="text"
              placeholder="Enter user name"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <div className="form-container">
            <input
              className="password message-text bg-white"
              type="password"
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
        </div>

        <button type="submit">Login</button>
      </div>
    </form>
  );
}

export default LogInPage;
