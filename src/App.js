import "./App.css";
import "./Utilities.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import LoginPatientUser from "./Pages/Login/loginPatientUser";
import LoginProfessionalUser from "./Pages/Login/loginProfessionalUser";
import AdminPage from "./Pages/Login/AdminPage";
import Parse from "parse";

// Your Parse initialization configuration goes here
const PARSE_APPLICATION_ID = "QuGtog6ad13b02XIRbK4johVN1xoqHc334Yj3a48"; //from back4app --> app settings --> security & keys
const PARSE_HOST_URL = "https://parseapi.back4app.com/"; //form server settings --> host url in the back4app platform
const PARSE_JAVASCRIPT_KEY = "rMsoyGV5w8xzNM59cuLAx4lX7LkwMnNdLNC1EUSB"; //from back4app --> app settings --> security & keys
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/loginPatientUser" element={<LoginPatientUser />} />
        <Route path="/loginTherapistUser" element={<LoginProfessionalUser />} />
      </Routes>
    </>
  );
}

export default App;
