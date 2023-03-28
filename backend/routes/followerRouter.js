const express = require("express");
const followController = require("../controllers/followerController");

const router = express.Router();

router.get("/:id", followController.getAllFollowers);

module.exports = router;
