import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

export function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <code>{JSON.stringify(user)}</code>
      <input type="button" value={t("logout")} onClick={handleLogout} />
    </>
  );
}
