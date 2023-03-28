const Follower = require("../model/followerModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllFollowers = catchAsync(async (req, res, next) => {
  const { id } = req.query;
  const allFollowers = await Follower.find({ userId: id }).populate(
    "followedBy"
  );

  res.status(200).json({
    status: "success",
    length: allFollowers.length,
    data: allFollowers,
  });
});

