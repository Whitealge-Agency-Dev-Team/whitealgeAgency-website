import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import header from "./header.module.css";
import viteLogo from "../../assets/react.svg";

export default function Header() {
  const [login, setLogin] = useState(true);

  const handleLogin = () => setLogin(false);

  return (
    <header className={header.header}>
      <div>
        <Link to="/">
          <img src={viteLogo} alt="Home"  className={header.logo}/>
        </Link>
      </div>
      <nav className={header.nav}>
        <ul className={header.list}>
          <li>
            <Link to={"/services"} className={header.link}>
              Servicios
            </Link>
          </li>
          <li>
            <Link to={"/staff"} className={header.link}>
              Staff
            </Link>
          </li>
          <li>
            <Link to={"/courses"} className={header.link}>
              Cursos
            </Link>
          </li>
        </ul>
        {login && (
          <ul className={header.list}>
            <li>
              <button onClick={handleLogin} className={header.button}>
                Iniciar sesión
              </button>
            </li>
            <li>
              <button className={header.button}>Registrarse</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
