import { resources } from "@zosterp/locales";

export const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  const rawMessage =
    typeof err.message === "string" ? err.message : "internal_server_error";

  const codes = rawMessage
    .split(",")
    .map((c) => c.trim())
    .filter(Boolean);

  const ISE = "internal_server_error";
  const lang = resources[req.language] ? req.language : "en";
  const translations = resources[lang]?.translation || {};

  const info = {};

  if (codes.length === 0) codes.push(ISE);

  for (const c of codes)
    info[c] =
      translations[c] || translations[ISE] || "An unexpected error occurred";

  console.error(`[Error ${status}]:`, info);

  return res.status(status).json({
    error: true,
    status,
    info,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
