import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingPageHero from "./Pages/LandingPage/LandingPageHero";
import { Routes, Route } from "react-router-dom";
import LoginPatientUser from "./Pages/LandingPage/loginPatientUser";
import LoginProfessionalUser from "./Pages/LandingPage/loginProfessionalUser";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPageHero />} />
        <Route path="/loginPatientUser" element={<LoginPatientUser />} />
        <Route
          path="/loginProfessionalUser"
          element={<LoginProfessionalUser />}
        />
      </Routes>
    </>
  );
}

export default App;
