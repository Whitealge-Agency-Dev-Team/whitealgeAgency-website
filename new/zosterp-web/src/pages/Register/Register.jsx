import { useForm } from "react-hook-form";
import { useAuth } from "../../AuthProvider";
import { useNavigate } from "react-router-dom";
import css from "./Register.module.css";

function Register() {
  const navigate = useNavigate();
  const { register: authRegister, loading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const handleSubmitForm = async (data) => {
    const { confirmPassword, ...parsedData } = data;
    try {
      const response = await authRegister(parsedData);
      if (response) navigate("/profile");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div>
        <h1>Registrese para comenzar</h1>
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <label htmlFor="name">Nombre:</label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Nombre requerido." })}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
          <br />
          <label htmlFor="surname">Apellido:</label>
          <input
            id="surname"
            type="text"
            {...register("surname", { required: "Apellido es requerido" })}
          />
          {errors.surname && (
            <p style={{ color: "red" }}>{errors.surname.message}</p>
          )}
          <br />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "El correo es obligatorio",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                message: "El formato de correo no es válido",
              },
            })}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
          <br />
          <label htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            {...register("password", {
              required: "Contraseña requerida",
              minLength: {
                value: 11,
                message: "Contraseña de al menos 11 caracteres.",
              },
            })}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
          <br />
          <label htmlFor="confirmPassword">Confirmar contraseña:</label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Debes confirmar tu contraseña",
              validate: (value) =>
                value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
          <br />
          <input type="submit" disabled={loading} />
          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
}

export default Register;
