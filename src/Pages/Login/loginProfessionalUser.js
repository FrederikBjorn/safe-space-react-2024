import { React, useState } from "react";
import { loginUser } from "../../Components/authService"; // Import login function from authService
import "./loginUser.css";

export default function LoginProfessionalUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleUserName(event) {
    setUsername(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  //hanle the login, as an async function, e.g. on a different thread.
  async function handleLogin() {
    const user = await loginUser(username, password);

    if (user) {
      alert("Login successful");
    } else {
      alert("Invalid username or password :(:(");
    }
  }

  return (
    <form
      className="loginForm"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent page reload
        handleLogin();
      }}
    >
      {/*forms for username and password*/}

      <div className="login-square container-sm bg-white">
        <h2 className="login-header text-header">Login as a Therapist user</h2>

        <div className="forms">
          {/*logic for handeling the user login - username*/}
          <div className="form-container">
            {/* <label htmlFor="userName"> Login </label> */}
            <input
              className="userName message-text bg-white"
              type="text"
              placeholder="Enter user name"
              onChange={handleUserName}
            />
          </div>

          {/*logic for handeling the user login - password*/}

          <div className="form-container">
            {/* <label htmlFor="password"> Password </label> */}
            <input
              className="password message-text bg-white"
              type="password"
              placeholder="Enter password"
              onChange={handlePassword}
            />
          </div>
        </div>

        <button type="submit">Login</button>
      </div>
    </form>
  );
}
