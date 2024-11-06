import { React, useState } from "react";
import Parse from "parse"; // Import Parse to use it directly here
import { loginUser } from "../../Components/authService"; // Import login function from authService

export default function LoginPatientUser({ setIsLoggedIn }) {
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
      setIsLoggedIn(true);
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

      <h2>Login as a Patient user upon referal</h2>

      {/*logic for handeling the user login - username*/}
      <label htmlFor="userName"> Login </label>
      <input
        className="userName"
        type="text"
        placeholder="Enter user name"
        onChange={handleUserName}
      />

      {/*logic for handeling the user login - password*/}

      <label htmlFor="password"> Password </label>
      <input
        className="password"
        type="password"
        placeholder="Enter password"
        onChange={handlePassword}
      />
      <button type="submit">Login</button>
    </form>
  );
}
