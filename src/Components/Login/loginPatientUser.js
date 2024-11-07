import { React, useState } from "react";
import "./loginUser.css";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import Parse from "parse";
import { useAuth } from "../AuthContext"; // Import useAuth

export default function LoginPatientUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuthenticatedUser } = useAuth(); // Get setAuthenticatedUser from context

  const loginUser = async () => {
    try {
      const query = new Parse.Query("patientUser");
      query.equalTo("userName", username);

      const user = await query.first();

      if (user) {
        const storedHashedPassword = user.get("password");
        const isPasswordValid = await bcrypt.compare(
          password,
          storedHashedPassword
        );

        if (isPasswordValid) {
          setAuthenticatedUser(user); // Update the context state
          console.log("Login successful:", user.get("userName"));

          setUsername("");
          setPassword("");
          navigate("/chat");
          return true;
        } else {
          console.error("Invalid password.");
          return false;
        }
      } else {
        console.error("User not found.");
        return false;
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return false;
    }
  };

  //hanle the login, as an async function, e.g. on a different thread.
  async function handleLogin() {
    const user = await loginUser();
    if (user) {
      alert("Login successful");
      navigate("/chat");
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
        <h2 className="login-header text-header">Login as a Patient user</h2>

        <div className="forms">
          {/*logic for handeling the user login - username*/}
          <div className="form-container">
            {/* <label htmlFor="userName"> Login </label> */}
            <input
              className="userName message-text bg-white"
              type="text"
              placeholder="Enter user name"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          {/*logic for handeling the user login - password*/}

          <div className="form-container">
            {/* <label htmlFor="password"> Password </label> */}
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
