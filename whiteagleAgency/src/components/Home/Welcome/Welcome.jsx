import { useState, useEffect, useRef } from "react";
import "./WelcomeSection.css";

export default function WelcomeSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const ticking = useRef(false);
  const [visible, setVisible] = useState(false);
  const [firstSession, setFirstSession] = useState(false);

  useEffect(() => {
    const isFirstSession = !sessionStorage.getItem("hasVisited");
    setFirstSession(isFirstSession);
    if (isFirstSession) {
      sessionStorage.setItem("hasVisited", "true");
      setTimeout(() => setVisible(true), 1500);
    } else {
      setVisible(true);
    }

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`welcome-section ${isScrolled ? "scrolled" : ""}`}>
      <div
        className={
          "welcomeInfo" +
          (visible ? " visible" : "") +
          (firstSession ? " first-session" : "")
        }
      >
        <h1 className="title" style={{color: "white"}}>Somos WhitEagle</h1>
        <p className="subtitle">La mejor alternativa para tu crecimiento</p>
      </div>
    </div>
  );
}
