import { useState } from "react";
import LoginCSS from "./login.module.css";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email.includes("@")) {
      newErrors.email = "Correo inválido.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener mínimo 6 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Datos de login:", formData);
    }
  };

  return (
    <div className={LoginCSS.container}>
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit} className={LoginCSS.form}>
        <label>
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className={LoginCSS.error}>{errors.email}</p>}
        </label>

        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className={LoginCSS.error}>{errors.password}</p>
          )}
        </label>

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
