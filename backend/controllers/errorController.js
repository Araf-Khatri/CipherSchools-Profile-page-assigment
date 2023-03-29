const AppError = require("../utils/appError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handlerDuplicateFieldsDB = (err) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}. Please use another value!`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  console.log(errors)
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendError = (err, req, res) => {
  console.log(req.originalUrl);
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err._message,
    });
  }
};

module.exports = (err, req, res, next) => {
  console.log("errorrrr", err.name);
  if (err.name === "CastError") err = handleCastErrorDB(err);
  else if (err.code === 11000) err = handlerDuplicateFieldsDB(err);
  else if (err.name === "ValidationError") err = handleValidationErrorDB(err);
  else {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
  }
  sendError(err, req, res);
};
