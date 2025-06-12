import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import viteLogo from "../../public/vite.svg";

export default function Header() {
    const [login, setLogin] = useState(true);

    const handleLogin = () => setLogin(false)

    return (
        <header>
            <div>
                <Link to="/">
                    <img src={viteLogo} alt="Home" />
                </Link>
            </div>
            <nav>
                <ul>
                    <li><Link to={"/services"}>Servicios</Link></li>
                    <li><Link to={"/staff"}>Staff</Link></li>
                    <li><Link to={"/courses"}>Cursos</Link></li>
                </ul>
                {login && (
                    <ul>
                        <li><button onClick={handleLogin}>Iniciar sesión</button></li>
                        <li><button>Registrarse</button></li>
                    </ul>)}
            </nav>
        </header>
    );
}