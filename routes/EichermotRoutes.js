const express = require("express");
const EichermotCont = require("../controllers/EichermotCont");
const authController = require("../controllers/authCont");

const router = express.Router();

router
  .route("/")
  .get(/* authController.protect, */ EichermotCont.getAllData)
  .post(
/* authController.protect, authController.restrictTo('admin'), */
    EichermotCont.createData
  );

router
  .route("/:id")
  .patch(/* authController.protect, */ EichermotCont.updateData)
  .delete(
/* authController.protect, authController.restrictTo('admin'), */
    EichermotCont.deleteData
  );

module.exports = router;
