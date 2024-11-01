import { useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingPageHero from "./Pages/LandingPage/LandingPageHero";
import { Routes, Route } from "react-router-dom";
import LoginPatientUser from "./Pages/LandingPage/loginPatientUser";
import LoginProfessionalUser from "./Pages/LandingPage/loginProfessionalUser";

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
