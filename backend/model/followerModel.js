const mongoose = require("mongoose");
const validator = require("validator");

const followerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, "current user ID missing"],
  },
  follower: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    unique: true,
    required: [true, "must be a userId"],
    validate: {
      validator: function (el) {
        console.log(el, this.userId)
        return el !== this.userId;
      },
      message: 'user not allowed to follow itself',
    },
  },
});

const Follower = mongoose.model("Follow", followerSchema);

module.exports = Follower;
