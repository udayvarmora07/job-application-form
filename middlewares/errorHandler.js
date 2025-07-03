export const errorHandler = (err, req, res, next) => {
  if (err?.errors) {
    return res.status(400).json({
      status: "error",
      message: "validation error.",
      errors: err.errors,
    });
  }
  res.status(400).json({
    status: "error",
    message: `${err.message || "Error Accoured!"}`,
    err,
  });
  next()
};
