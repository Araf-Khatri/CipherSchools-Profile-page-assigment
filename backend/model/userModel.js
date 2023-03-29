const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please tell your name"],
    },
    profilePhoto: {
      type: String, // IMPORTANT
    },
    mobileNo: {
      type: Number,
      validate: {
        validator: (el) => {
          console.log(el);
          return Number.toString(el).length === 10;
        },
        message: "Mobile Number must contain 10 characters",
      },
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [validator.isEmail, "Please add provide valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 8,
      trim: true,
      select: false,
    },
    passwordConfirm: {
      type: String,
      require: [true, "please confirm your password"],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password are not the same!",
      },
    },
    about: {
      type: String,
    },
    highestEducation: String,
    currentStatus: String,
    socials: {
      type: mongoose.Schema.ObjectId,
      ref: "Socials",
    },
    interests: {
      type: Array,
      // enum: [
      //   "App Development",
      //   "Web Development",
      //   "Game Development",
      //   "Data Structures",
      //   "Programming",
      //   "Machine Learning",
      //   "Data Science",
      //   "Others",
      // ],
    },
  },

  {
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.select("-__v -_id");
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
