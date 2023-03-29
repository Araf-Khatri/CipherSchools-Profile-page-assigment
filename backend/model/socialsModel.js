const mongoose = require("mongoose");

const socialsSchema = new mongoose.Schema({
  github: String,
  linkedIn: String,
  facebook: String,
  twitter: String,
  instagram: String,
  website: String,
  userId: {
    type: mongoose.Schema.ObjectId,
    unique: true,
    ref: "User",
    required: [true, 'socials link must belong to user']
  },
});

const Socials = mongoose.model("Socials", socialsSchema);

module.exports = Socials;
