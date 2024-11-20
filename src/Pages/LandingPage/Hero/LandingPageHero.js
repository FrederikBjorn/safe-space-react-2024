import { React } from "react";
import "./LandingPageHero.css"
import { useNavigate } from "react-router-dom";
import Wave from "../../../Components/lib/Wave";

function LandingPageHero() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero bg-blue">
        <div className="container-lg">
          <div className="hero-contents">
            <div className="hero-left">
              <div className="hero-left-text">
                <p className="text-xl-header text-center">
                  An online room for conversation while you wait!
                </p>
              </div>
              <div className="hero-left-button">
                <div className="button-text">
                  <p className="text-standard">Have a referral?</p>
                  <button
                    className="login"
                    type="button"
                    onClick={() => navigate("/login")}
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <img src="Images/hands.png" alt="hands" />
            </div>
          </div>
        </div>
      </section>
      <Wave />
    </>
  );
}

export default LandingPageHero;
