import { resources } from "@zosterp/locales";

export const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const rawCode = err.message || "INTERNAL_SERVER_ERROR";
  const lang = resources[req.language] ? req.language : "en";
  const [code, value] = rawCode.split(".");

  let message =
    resources[lang].translation[code] ||
    resources[lang].translation["INTERNAL_SERVER_ERROR"] ||
    "An unexpected error occurred";

  if (value) message = message.replaceAll("*", value);

  console.error(`[Error ${status}]: ${rawCode} - ${message}`);

  return res.status(status).json({
    error: true,
    code: rawCode,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
