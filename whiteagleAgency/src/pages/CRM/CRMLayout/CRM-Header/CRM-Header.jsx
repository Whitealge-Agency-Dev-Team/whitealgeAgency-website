import { useState } from "react";
import { Link } from "react-router-dom";
import "./CRM-Header-Style.css";

export default function Header() {
  const [menu, setMenu] = useState(false);

  const displayMenu = {
    opacity: menu ? "" : "0",
    visibility: menu ? "" : "hidden",
    transition: menu ? "" : "0.5s ease",
  };

  return (
    <>
      <header className="header-Content">
        <button onClick={() => setMenu(!menu)} className="menu-Button">
          <div className="header-menu-Button-bar"></div>
          <div className="header-menu-Button-bar"></div>
          <div className="header-menu-Button-bar"></div>
        </button>
        <nav className="header-Search-Input">
          <input
            type="text"
            className="Search-Input"
            placeholder="Buscar contactos, clientes, empresas etc."
          />
        </nav>
        <div className="header-user-Profile-Content">
          <button className="header-user-Profile-Content-profile-Btn">
            <img
              className="header-user-Profile-img"
              src="/images/logo.svg"
              alt="user-Profile-img"
            />
          </button>
        </div>
      </header>
      <div className="side-Bar" style={displayMenu}>
        <button className="button-Logo-Side-Bar" style={displayMenu}>
          Funcionalidad 1
          <img
            src="/images/logo.svg"
            className="img-Functionability"
            alt="button-Logo-Clientes"
          />
        </button>
        <button className="button-Logo-Side-Bar" style={displayMenu}>
          Funcionalidad 2
          <img
            src="/images/logo.svg"
            className="img-Functionability"
            alt="button-Logo-Equipo"
          />
        </button>
        <button className="button-Logo-Side-Bar" style={displayMenu}>
          Funcionalidad 3
          <img
            src="/images/logo.svg"
            className="img-Functionability"
            alt="button-Logo-Negocio"
          />
        </button>
        <Link to="/">
        <button className="button-Logo-Side-Bar-Exit">Ir a la página principal</button>
        </Link>
      </div>
    </>
  );
}
