import { React } from "react";
import "./LandingPageHero.css";
import { useNavigate } from "react-router-dom";

function LandingPageHero() {
  const navigate = useNavigate();

  function handlePatient() {
    navigate("/loginPatientUser");
  }

  function handleProfessional() {
    navigate("/loginProfessionalUser");
  }

  return (
    <section className="hero">
      <div className="container"></div>
      <h1>Welcome to SafeSpace</h1>

      <form className="loginForm">
        <lable> Login as </lable>
        <button type="button" className="formButton" onClick={handlePatient}>
          Patient user
        </button>
        {" or "}
        <button
          type="button"
          className="formButton"
          onClick={handleProfessional}
        >
          Profesional user
        </button>
      </form>
    </section>
  );
}

export default LandingPageHero;
