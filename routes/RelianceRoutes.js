const express = require("express");
const RelianceCont = require("../controllers/RelianceCont");
const authController = require("../controllers/authCont");

const router = express.Router();

router
  .route("/")
  .get(/* authController.protect, */ RelianceCont.getAllData)
  .post(
    // authController.protect,
    // authController.restrictTo("admin"),
    RelianceCont.createData
  );

router
  .route("/:id")
  .patch(RelianceCont.updateData)
  .delete(
    // authController.protect,
    // authController.restrictTo("admin"),
    RelianceCont.deleteData
  );

module.exports = router;
