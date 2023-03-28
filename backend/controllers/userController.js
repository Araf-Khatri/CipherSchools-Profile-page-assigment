const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");

exports.updateProfile = catchAsync(async (req, res, next) => {
  const { userId, data, type } = req.body;
});

exports.updateInterest = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { interests } = req.body;
  const userData = await User.findById(id);
  userData.interests = interests;
  userData.save();

  res.status(200).json({
    status: "success",
    data: userData,
  });
});


exports.getAllFollowers