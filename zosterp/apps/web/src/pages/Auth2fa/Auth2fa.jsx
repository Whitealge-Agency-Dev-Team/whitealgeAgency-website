import { useTranslation } from "react-i18next";
import css from "./Auth2fa.module.css";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import { useAuth } from "../../AuthProvider";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { joiResolver } from "@hookform/resolvers/joi";
import { schema2fa } from "@zosterp/schemas";

export function Auth2fa() {
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { t } = useTranslation();
  const { auth2fa, error, loading } = useAuth();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm({
    resolver: joiResolver(schema2fa),
    mode: "onChange",
  });

  const token = location.state?.token;
  const codeValue = watch("code");

  const handleSubmitForm = async (data) => {
    try {
      const response = await auth2fa(data);
      if (response) navigate("/profile");
    } catch (err) {
      console.error(err);
    }
  };

  if (!token) return <Navigate to="/auth/login" />;

  useEffect(() => {
    register("token");
    setValue("token", token, { shouldValidate: true });
  }, [token, register, setValue]);

  useEffect(() => {
    if (isValid && codeValue?.length === 6 && formRef.current)
      formRef.current.requestSubmit();
  }, [isValid, codeValue]);

  return (
    <div className={css.container}>
      <form ref={formRef} onSubmit={handleSubmit(handleSubmitForm)}>
        <h1>{t("2fa_code")}</h1>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          {...register("code")}
          disabled={loading}
        />
        {error && <p className={css.error}>{error}</p>}
        {loading && <p>{t("loading")}</p>}
      </form>
    </div>
  );
}
