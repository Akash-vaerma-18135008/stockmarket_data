const express = require("express");
const TataSteelCont = require("../controllers/TataSteelCont");
const authController = require("../controllers/authCont");

const router = express.Router();

router
  .route("/")
  .get( TataSteelCont.getAllData)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    TataSteelCont.createData
  );

router
  .route("/:id")
  .patch(TataSteelCont.updateData)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    TataSteelCont.deleteData
  );

module.exports = router;
