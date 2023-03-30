const User = require("../model/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("./../utils/catchAsync");

exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return next(new AppError("Please provide email and password", 400));

  const userData = await User.findOne({ email: email }).select("+password");

  if (
    !userData ||
    !(await userData.correctPassword(password, userData.password))
  ) {
    return next(new AppError("Incorrect email and password", 400));
  }

  userData.password = undefined;

  res.status(202).json({
    status: "success",
    data: {
      id: userData._id,
      name: userData.name,
      email: userData.email,
    },
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const {
    userId,
    currentPassword: password,
    newPassword,
    newPasswordConfirm,
  } = req.body;

  if (!userId) {
    return next(new AppError("request should contain users database id"));
  }

  const userData = await User.findById(userId).select("+password");
  if (
    !userData ||
    !(await userData.correctPassword(password, userData.password))
  ) {
    return next(new AppError("Incorrect email and password", 400));
  }

  userData.password = newPassword;
  userData.passwordConfirm = newPasswordConfirm;
  await userData.save();

  userData.password = undefined;

  res.status(200).json({
    data: userData,
  });
});
