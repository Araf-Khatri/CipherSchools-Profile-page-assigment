const mongoose = require("mongoose");

const socialsSchema = new mongoose.Schema({
  github: String,
  linkedIn: String,
  Facebook: String,
  twitter: String,
  instagram: String,
  website: String,
});

const Socials = mongoose.model("Socials", socialsSchema);

module.exports = Socials;
