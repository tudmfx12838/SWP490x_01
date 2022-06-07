var express = require("express");
var router = express.Router();

const authController = require("../controllers/auth");
const { validate } = require("../public/js/validator");

router.get("/login", authController.getUserLogin);

router.post("/login", validate.validateLogin(), authController.postUserLogin);

router.post("/logout", authController.postUserLogout);

module.exports = router;
