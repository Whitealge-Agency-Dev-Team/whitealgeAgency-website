import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthProvider";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  return (
    <>
      <h1>{JSON.stringify(user)}</h1>
      <button
        onClick={async () => {
          await logout();
          navigate("/");
        }}
      >
        Cerrar sesión
      </button>
    </>
  );
}

export default Profile;
