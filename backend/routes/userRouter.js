const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.patch("/password", authController.changePassword);

router
  .route("/profile/:id")
  .get(userController.getUserData)
  .patch(userController.updateProfile);

  
router
  .route("/interests/:id")
  .patch(userController.updateInterest);

module.exports = router;
