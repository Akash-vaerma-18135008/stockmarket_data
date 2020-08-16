const express = require("express");
const authController = require("../controllers/authCont");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch("/updateMyPassword",authController.protect,authController.updatePassword);

// router.patch("/updateMe", authController.protect, userController.updateMe);
// router.delete("/deleteMe", authController.protect, userController.deleteMe);

module.exports = router;
