const error = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";

  console.error(`[Error ${status}]: ${message}`);

  return res.status(status).json({
    error: true,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : {},
  });
};

module.exports = error;
