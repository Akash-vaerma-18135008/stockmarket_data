const express = require("express");
const AshokCont = require("../controllers/AshokCont");
const authController = require("../controllers/authCont");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, AshokCont.getAllData)
  .post(authController.protect, authController.restrictTo('admin'), AshokCont.createData);

router
  .route("/:id")
  .patch(AshokCont.updateData)
  .delete(authController.protect, authController.restrictTo('admin'), AshokCont.deleteData);

module.exports = router;
