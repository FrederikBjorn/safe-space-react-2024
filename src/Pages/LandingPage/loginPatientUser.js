import { React, useState } from "react";
import Parse from "parse"; // Import Parse to use it directly here

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
    try {
      // create a query to search for user in the patientUser table in db
      const query = new Parse.Query("patientUser");
      query.equalTo("userName", username);

      //execute the quetry to get the user
      const user = await query.first();

      if (user && user.get("password") === password) {
        // if the password is an exact match, log in user
        setIsLoggedIn(true);
        alert("Login Successful, YAAY!");
      } else {
        // of no user found or password did not match
        alert("no user found or password did not match, sorry");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("We've had a login error, please try again, sry");
    }
    // Simple validation for testing purposes, can be removed later
    /*if (username === "hej" && password === "hejhej") {
      setIsLoggedIn(true); // Update login status on successful login
      alert("Login successful");
    } else {
      alert("Invalid username or password");
    }*/
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
