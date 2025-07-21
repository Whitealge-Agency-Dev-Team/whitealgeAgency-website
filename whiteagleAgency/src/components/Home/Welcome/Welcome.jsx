import { useState, useEffect, useRef } from "react";
import "./WelcomeSection.css";

export default function WelcomeSection() {
  const [isScrolled, setIsScrolled] = useState(false);
  const ticking = useRef(false);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
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

  useEffect(() => {
    setTimeout(() => setOpacity(1), 1500);
  }, [])

  return (
    <div className={`welcome-section ${isScrolled ? "scrolled" : ""}`}>
      <div style={{opacity:opacity}} className="welcomeInfo">
        <h1 className="title">Somos WhitEalge</h1>
        <p className="subtitle">La mejor alternativa para tu crecimiento</p>
      </div>
    </div>
  );
}
