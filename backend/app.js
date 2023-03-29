const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const followRouter = require("./routes/followerRouter");
const morgan = require("morgan");
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

module.exports = app;
