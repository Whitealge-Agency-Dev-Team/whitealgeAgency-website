import { Outlet, Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function Layout() {
  const { user } = useAuth();

  return (
    <>
      <header>
        <nav>
          {!user ? (
            <ul>
              <li>
                <Link to="/auth/login">Iniciar sesión</Link>
              </li>
              <li>
                <Link to="/auth/register">Registrarse</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/profile">Mi Perfil</Link>
              </li>
            </ul>
          )}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </>
  );
}

export default Layout;
