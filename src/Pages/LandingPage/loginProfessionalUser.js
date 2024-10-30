import { React, useState } from "react";

export default function LoginProfessionalUser() {
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");

  function handleUserName(username) {
    setUsername(username);
  }

  function handlePassword(password) {
    setpassword(password);
  }

  return (
    <form className="loginForm">
      {/*forms for username and password*/}

      <h2>Login as a Professional user upon referal</h2>

      <label htmlFor="userName"> Login </label>
      <input
        className="userName"
        type="text"
        placeholder="Enter user name"
        onChange={(e) => handleUserName(e)}
      />
      <label htmlFor="password"> Password </label>
      <input
        className="password"
        type="password"
        placeholder="Enter password"
        onChange={(e) => handlePassword(e)}
      />
      <button>Login</button>
    </form>
  );
}
