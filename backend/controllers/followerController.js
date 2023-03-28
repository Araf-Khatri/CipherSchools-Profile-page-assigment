const Follower = require("../model/followerModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllFollowers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const allFollowers = await Follower.aggregate([
    {
      $match: { userId: id },
    },
    {
      $sort: { follower: 1 },
    },
    {
      $limit: 5,
    },
  ]);

  res.status(200).json({
    status: "success",
    length: allFollowers.length,
    data: allFollowers,
  });
});

exports.addFollower = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = await Follower.create({
    userId: id,
    follower: req.body.followerId,
  });

  res.status(201).json({
    status: "success",
    data,
  });
});
