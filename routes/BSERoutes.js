const express = require("express");
const BSECont = require("../controllers/BSECont");
const authController = require("../controllers/authCont");

const router = express.Router();

router
  .route("/")
  .get( BSECont.getAllData)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    BSECont.createData
  );

router
  .route("/:id")
  .patch(BSECont.updateData)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    BSECont.deleteData
  );

module.exports = router;
