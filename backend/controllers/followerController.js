const Follower = require("../model/followerModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllFollowers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { limit, page } = req.query;

  const allFollowers = await Follower.find({ userId: id })
    .populate("follower")
    .select("-_id -__v -userId")
    .skip((+page - 1) * +limit)
    .limit(limit);
  const followersArr = allFollowers.map(({ follower: { name, email } }) => ({ name, email }));
  res.status(200).json({
    status: "success",
    length: allFollowers.length,
    data: followersArr,
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
