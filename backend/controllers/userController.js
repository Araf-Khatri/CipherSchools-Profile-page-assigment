const Socials = require("../model/socialsModel");
const User = require("../model/userModel");

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const updateUserSocials = async (userId, data = {}, response) => {
  let socialsData = await Socials.findOneAndUpdate({ userId: userId }, data, {
    new: true,
    runValidators: true,
  });
  if (!socialsData) {
    socialsData = await Socials.create({
      userId: userId,
      ...data,
    });
    socialsData.save({ validator: true });
  }

  response.status(200).json({
    status: "success",
    data: socialsData,
  });
};

const updateUserProfile = async (userId, data, response) => {
  const userData = await User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  });
  response.status(200).json({
    status: "success",
    data: userData,
  });
};

exports.updateProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { type } = req.query;
  const data = req.body;

  if (type === "socials") {
    // data: {linkedIn, github, facebook, twitter, instagram, website}
    await updateUserSocials(id, data, res);
  } else if (type === "profile" || type === "about") {
    await updateUserProfile(id, data, res);
  }
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

exports.getAllFollowers;
