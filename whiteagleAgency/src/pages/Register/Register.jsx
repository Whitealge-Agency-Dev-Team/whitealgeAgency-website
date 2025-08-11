import { useState } from "react";
import RegisterCSS from "./register.module.css";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    confirmEmail: "",
    password: "",
    name: "",
    rubro: "",
    role: "",
    companyName: "",
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
    if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = "Los correos no coinciden.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener mínimo 6 caracteres.";
    }
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!formData.rubro.trim()) {
      newErrors.rubro = "El rubro es obligatorio.";
    }
    if (!formData.role.trim()) {
      newErrors.role = "El rol es obligatorio.";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "El nombre de la empresa es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Datos enviados:", formData);
    }
  };

  return (
    <div id="registerPag">
      <div className={RegisterCSS.container}>
        <h1>Registro de Usuario</h1>
        <form onSubmit={handleSubmit} className={RegisterCSS.form}>
          <label>
            Correo electrónico:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className={RegisterCSS.error}>{errors.email}</p>}
          </label>

          <label>
            Verificar correo:
            <input
              type="email"
              name="confirmEmail"
              value={formData.confirmEmail}
              onChange={handleChange}
            />
            {errors.confirmEmail && (
              <p className={RegisterCSS.error}>{errors.confirmEmail}</p>
            )}
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
              <p className={RegisterCSS.error}>{errors.password}</p>
            )}
          </label>

          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className={RegisterCSS.error}>{errors.name}</p>}
          </label>

          <label>
            Rubro:
            <input
              type="text"
              name="rubro"
              value={formData.rubro}
              onChange={handleChange}
            />
            {errors.rubro && <p className={RegisterCSS.error}>{errors.rubro}</p>}
          </label>

          <label>
            Rol del usuario:
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
            {errors.role && <p className={RegisterCSS.error}>{errors.role}</p>}
          </label>

          <label>
            Nombre de la empresa:
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
            />
            {errors.companyName && (
              <p className={RegisterCSS.error}>{errors.companyName}</p>
            )}
          </label>

          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
}
