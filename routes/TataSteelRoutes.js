const express = require("express");
const TataSteelCont = require("../controllers/TataSteelCont");
const authController = require("../controllers/authCont");

const router = express.Router();

router
  .route("/")
  .get(/* authController.protect, */ TataSteelCont.getAllData)
  .post(
/* authController.protect, authController.restrictTo('admin'), */
    TataSteelCont.createData
  );

router
  .route("/:id")
  .patch(/* authController.protect, */ TataSteelCont.updateData)
  .delete(
/* authController.protect, authController.restrictTo('admin'), */
    TataSteelCont.deleteData
  );

module.exports = router;
