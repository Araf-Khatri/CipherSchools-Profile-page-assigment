const userRouter = require("./routes/userRouter");
const followRouter = require("./routes/followerRouter");
const globalErrorHandler = require("./controllers/errorController");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const app = express();

app.use(cors());
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(
  express.urlencoded({
    limit: "10kb",
    extended: true,
  })
);
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Cookie parser not installed

app.use("/api/user", userRouter);
app.use("/api/follower", followRouter);

app.use("*", (req, res, next) => {
  console.log(next)
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
