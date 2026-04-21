import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../AuthProvider";
import { useTranslation } from "react-i18next"

export function Layout() {
  const { user } = useAuth();
  const { t } = useTranslation()
  return (
    <>
      <header>
        <nav>
          {!user && (
            <ul>
              <li>
                <Link to={"/auth/login"}>{t("login")}</Link>
              </li>
              <li>
                <Link to={"/auth/register"}>{t("register")}</Link>
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
