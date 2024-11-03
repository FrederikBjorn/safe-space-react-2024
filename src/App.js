import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingPageHero from "./Pages/LandingPage/LandingPageHero";
import { Routes, Route } from "react-router-dom";
import LoginPatientUser from "./Pages/LandingPage/loginPatientUser";
import LoginProfessionalUser from "./Pages/LandingPage/loginProfessionalUser";
//import Parse from "parse";
//
//// Your Parse initialization configuration goes here
//const PARSE_APPLICATION_ID = "QuGtog6ad13b02XIRbK4johVN1xoqHc334Yj3a48"; //from back4app --> app settings --> security & keys
//const PARSE_HOST_URL = "https://parseapi.back4app.com/"; //form server settings --> host url in the back4app platform
//const PARSE_JAVASCRIPT_KEY = "rMsoyGV5w8xzNM59cuLAx4lX7LkwMnNdLNC1EUSB"; //from back4app --> app settings --> security & keys
//Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
//Parse.serverURL = PARSE_HOST_URL;

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
