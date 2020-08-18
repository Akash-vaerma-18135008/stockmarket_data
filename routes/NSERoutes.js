const express = require("express");
const NSECont = require("../controllers/NSECont");
const authController = require("../controllers/authCont");

const router = express.Router();

router
  .route("/")
  .get(/* authController.protect, */ NSECont.getAllData)
  .post(
/* authController.protect, authController.restrictTo('admin'), */
    NSECont.createData
  );

router
  .route("/:id")
  .patch(/* authController.protect, */ NSECont.updateData)
  .delete(
/* authController.protect, authController.restrictTo('admin'), */
    NSECont.deleteData
  );

module.exports = router;
