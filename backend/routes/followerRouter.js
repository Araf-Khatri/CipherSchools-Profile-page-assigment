const express = require("express");
const followController = require("../controllers/followerController");

const router = express.Router();

router
  .route("/:id")
  .get(followController.getAllFollowers)
  .put(followController.addFollower);

module.exports = router;
