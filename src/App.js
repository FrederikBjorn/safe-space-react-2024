import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import LogInPage from "./Pages/LogInPage/LogInPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import Parse from "parse";
import ChatPage from "./Pages/ChatPage/ChatPage";
import { useUserStore } from "./Components/UserData/useUserStore";
import { useEffect } from "react";

const app_id = process.env.REACT_APP_PARSE_APP_ID;
const host_url = process.env.REACT_APP_PARSE_HOST_URL;
const javascript_key = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(app_id, javascript_key);
Parse.serverURL = host_url;

function App() {
  const { isLoading, fetchUserInfo, setIsLoadingTrue } = useUserStore();

  useEffect(() => {
    const user = Parse.User.current();
    if (user) {
      fetchUserInfo(user.id);
    } else {
      fetchUserInfo(null);
    }
  }, [fetchUserInfo, setIsLoadingTrue]);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/chatpage" element={<ChatPage />} />
      </Routes>
    </>
  );
}

export default App;
