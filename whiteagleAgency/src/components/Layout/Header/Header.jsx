import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HeaderCSS from "./header.module.css";
import logo from "../../../assets/images/logo.svg";

export default function Header() {
  const [login, setLogin] = useState(true);

  const handleLogin = () => setLogin(false);

  return (
    <header className={HeaderCSS.header}>
      <div>
        <Link to="/">
          <img src={logo} alt="Home"  className={HeaderCSS.logo}/>
        </Link>
      </div>
      <nav className={HeaderCSS.nav}>
        <ul className={HeaderCSS.list}>
          <li>
            <Link to={"/services"} className={HeaderCSS.link}>
              Servicios
            </Link>
          </li>
          <li>
            <Link to={"/staff"} className={HeaderCSS.link}>
              Staff
            </Link>
          </li>
          <li>
            <Link to={"/courses"} className={HeaderCSS.link}>
              Cursos
            </Link>
          </li>
        </ul>
        {login && (
          <ul className={HeaderCSS.list}>
            <li>
              <button onClick={() => handleLogin()} className={HeaderCSS.button}>
                Iniciar sesión
              </button>
            </li>
            <li>
              <button className={HeaderCSS.button}>Registrarse</button>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}
