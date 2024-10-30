import "./App.css";
import "./Utilities.css";
import Navbar from "./Components/Navbar/Navbar";
import LandingPageHero from "./Pages/LandingPage/LandingPageHero";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPageHero />} />
      </Routes>
    </>
  );
}

export default App;
