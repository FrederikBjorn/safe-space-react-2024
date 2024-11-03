import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingPageHero from "./Pages/LandingPage/LandingPageHero";
import { Routes, Route } from "react-router-dom";
import LoginPatientUser from "./Pages/LandingPage/loginPatientUser";
import LoginProfessionalUser from "./Pages/LandingPage/loginProfessionalUser";
import Parse from "parse/dist/parse.min.js";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "YOUR_APPLICATION_ID_HERE";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "YOUR_JAVASCRIPT_KEY_HERE";
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn && <Navbar />}
      {/*Only rendering the navbar if patien or prof is logged in*/}
      <Routes>
        <Route path="/" element={<LandingPageHero />} />
        <Route
          path="/loginPatientUser"
          element={<LoginPatientUser setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/loginProfessionalUser"
          element={<LoginProfessionalUser setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </>
  );
}

export default App;
