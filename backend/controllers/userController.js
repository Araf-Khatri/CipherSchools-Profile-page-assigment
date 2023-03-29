const Socials = require("../model/socialsModel");
const User = require("../model/userModel");
const catchAsync = require("../utils/catchAsync");

const updateUser = async (Model, userId, newData = {}, response) => {
  let data = await Model.findOneAndUpdate({ userId: userId }, newData, {
    new: true,
  });
  if (!data) {
    data = await Model.create({
      userId: userId,
      ...newData,
    });
    data.save({ validator: true });
  }

  response.status(200).json({
    status: "success",
    data: data,
  });
};

exports.updateProfile = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { type } = req.query;
  const data = req.body;

  if (type === "socials") {
    // data: {linkedIn, github, facebook, twitter, instagram, website}
    updateUser(Socials, id, data, res);
  } else if (type === "profile") {
    updateUser(User, id, data, res);
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
