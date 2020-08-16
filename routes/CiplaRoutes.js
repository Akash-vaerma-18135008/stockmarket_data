const express = require("express");
const CiplaCont = require("../controllers/CiplaCont");
const authController = require("../controllers/authCont");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, CiplaCont.getAllData)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    CiplaCont.createData
  );

router
  .route("/:id")
  .patch(CiplaCont.updateData)
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    CiplaCont.deleteData
  );

module.exports = router;
