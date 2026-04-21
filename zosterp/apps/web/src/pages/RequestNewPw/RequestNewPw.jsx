import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../AuthProvider";
import { joiResolver } from "@hookform/resolvers/joi";
import { email } from "@zosterp/schemas";
import { useState } from "react";
import { Link } from "react-router-dom";

export function RequestNewPw() {
  const { t } = useTranslation();
  const [success, setSuccess] = useState(null);
  const { error, loading, requestNewPw } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: joiResolver(email),
    mode: "onTouched",
  });

  const handleSubmitForm = async (data) => {
    const response = await requestNewPw(data);
    if (response) setSuccess("renew_pw_success");
  };
  return (
    <div>
      <Link to={"/"}>{t("back")}</Link>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <h1>{t("recover-password-title")}</h1>
        <div>
          <label htmlFor="email">{t("email")}:</label>
          <input id="email" {...register("email")} disabled={loading} />
          {errors && errors["email"] && <p>{t(errors["email"].message)}</p>}
        </div>

        {success && <p>{t(success)}</p>}
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
