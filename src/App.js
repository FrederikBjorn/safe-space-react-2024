import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Routes, Route, Navigate } from "react-router-dom";
import LogInPage from "./Pages/LogInPage/LogInPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import Parse from "parse";
import ChatPage from "./Pages/ChatPage/ChatPage";
import { useUserStore } from "./Components/UserData/useUserStore";
import { useEffect } from "react";
import HomePage from "./Pages/HomePage/HomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const app_id = process.env.REACT_APP_PARSE_APP_ID;
const host_url = process.env.REACT_APP_PARSE_HOST_URL;
const javascript_key = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
const liverQueryUrl = "ws://safespacereact.b4a.io";

Parse.initialize(app_id, javascript_key);
Parse.serverURL = host_url;
Parse.liveQueryServerURL = liverQueryUrl;

function App() {
  const { isLoading, fetchUserInfo, setIsLoadingTrue } = useUserStore();
  const user = Parse.User.current();
  const adminId = process.env.REACT_APP_PARSE_ADMIN_ID;

  useEffect(() => {
    setIsLoadingTrue();
    if (user) {
      fetchUserInfo(user.id);
    } else {
      fetchUserInfo(null);
    }

    return () => {
      fetchUserInfo(null);
    };
  }, []);

  if (isLoading) return <div className="loading">Loading...</div>;

  if (user && user.id === adminId) {
    return (
      <>
        <Routes>
          <Route path="/adminpage" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/adminpage" />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loginpage" element={<LogInPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/chatpage" element={<ChatPage />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="*" element={<Navigate to="/homepage" />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;