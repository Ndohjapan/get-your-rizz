module.exports = async (err, req, res, next) => {
  let { status, message, errors } = err;
  status = status ? status : 500;
  let validationErrors;
  if (errors) {
    validationErrors = {};
    errors.forEach(
      (error) =>
        (validationErrors[error.path || "file"] = error.msg || error.message)
    );
  }
  if (status > 499) {
    message = "server error";
  }

  res.status(status).send({
    status: "error",
    path: req.originalUrl,
    timestamp: new Date().getTime(),
    message: message,
    validationErrors,
  });
};
