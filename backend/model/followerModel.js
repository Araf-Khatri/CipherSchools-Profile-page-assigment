const mongoose = require("mongoose");

const followerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true, "follower must follow someone"],
  },
  followedBy: {
    type: mongoose.Schema.ObjectId,
    required: [true, "it should be empty"],
  },
});

const Follower = mongoose.model("Follow", followerSchema);

module.exports = Follower;
