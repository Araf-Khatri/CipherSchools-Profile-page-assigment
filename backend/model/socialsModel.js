const mongoose = require("mongoose");

const socialsSchema = new mongoose.Schema({
  linkedIn: String,
  github: String,
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

socialsSchema.pre(/find/, function (next) {
  this.select('-_id -__v -userId')
  next()
})

const Socials = mongoose.model("Socials", socialsSchema);

module.exports = Socials;
