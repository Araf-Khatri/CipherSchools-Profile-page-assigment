const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/change-password", authController.changePassword);

router.post("/update-profile", userController.updateProfile);
router.post("/update-interests/:id", userController.updateInterest);



module.exports = router;