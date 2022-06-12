const path = require("path");
const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client");

router.get("/products", clientController.getProducts);

router.post("/client/order", clientController.postClientOrder);

router.post("/client/signup", clientController.postClientSignup);

router.get("/client/getCSRFToken", clientController.getCSRFToken);

router.post("/client/checkEmailExist", clientController.postCheckEmailExist);

router.post("/client/login", clientController.postClientLogin);

router.post("/client/logout", clientController.postClientLogout);

router.post("/client/checkingAuth", clientController.postCheckingAuth);



module.exports = router;
