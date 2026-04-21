import { useAuth } from "../../AuthProvider";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { loginSchema, registerSchema } from "@zosterp/schemas";
import css from "./Authenticate.module.css";
import { useEffect } from "react";

export function Authenticate({ isLogin = true }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    login,
    register: authRegister,
    loading,
    error,
    clearError,
  } = useAuth();

  const schema = isLogin ? loginSchema : registerSchema;
  const providerAction = isLogin ? login : authRegister;
  const keys = isLogin
    ? ["email", "password"]
    : ["name", "surname", "email", "password", "confirmPassword"];
  useEffect(() => clearError(), []);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(schema),
    mode: "onTouched",
  });

  const handleSubmitForm = async (data) => {
    try {
      const response = await providerAction(data);
      const token = response?.token;
      if (response) {
        if (token) navigate("/auth/2FA", { state: { token } });
        else navigate("/profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={css.container}>
      <Link to={"/"}>{t("back")}</Link>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <h1>{t(isLogin ? "login" : "register")}</h1>
        {keys.map((key) => (
          <div key={key} className={css.inputGroup}>
            <label htmlFor={key}>{t(key)}*:</label>
            <input
              id={key}
              type={
                key.toLowerCase().includes("password") ? "password" : "text"
              }
              {...register(key)}
              className={errors[key] ? css.inputError : ""}
              disabled={loading}
            />
            {errors[key] && (
              <p className={css.errorMessage}>{t(errors[key].message)}</p>
            )}
          </div>
        ))}

        {error && <p className={css.serverError}>{t(error)}</p>}

        <input
          type="submit"
          value={loading ? t("loading") : t("send")}
          disabled={loading || !isValid}
        />
      </form>
    </div>
  );
}
