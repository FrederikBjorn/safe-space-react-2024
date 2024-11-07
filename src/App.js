import "./App.css";
import "./Utilities.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import LoginPatientUser from "./Components/Login/loginPatientUser";
import AdminPage from "./Components/Login/AdminPage";
import Parse from "parse";
import Chat from "./Pages/Chat/Chat";

// Your Parse initialization configuration goes here
const app_id = process.env.REACT_APP_PARSE_APP_ID; //from back4app --> app settings --> security & keys
const host_url = process.env.REACT_APP_PARSE_HOST_URL; //form server settings --> host url in the back4app platform
const javascript_key = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY; //from back4app --> app settings --> security & keys
Parse.initialize(app_id, javascript_key);
Parse.serverURL = host_url;

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/loginPatientUser" element={<LoginPatientUser />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
}

export default App;
