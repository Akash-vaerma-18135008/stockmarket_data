const express = require("express");
const BSECont = require("../controllers/BSECont");
const authController = require("../controllers/authCont");

const router = express.Router();

router
  .route("/")
  .get(/* authController.protect, */ BSECont.getAllData)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    BSECont.createData
  );

router
  .route("/:id")
  .patch(/* authController.protect, */ BSECont.updateData)
  .delete(
/* authController.protect, authController.restrictTo('admin'), */
    BSECont.deleteData
  );

module.exports = router;
