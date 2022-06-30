const path = require("path");
const express = require("express");
const router = express.Router();

const clientController = require("../controllers/client");

router.get("/products", clientController.getProducts);

router.post("/client/order", clientController.postClientOrder);

router.post("/client/signup", clientController.postClientSignup);

router.get("/client/getCSRFToken", clientController.getCSRFToken);

router.post("/client/checkEmailExist", clientController.postCheckEmailExist);

router.post("/client/checkCouponExist", clientController.postCheckCouponExist);

router.post("/client/login", clientController.postClientLogin);

router.post("/client/logout", clientController.postClientLogout);

router.post("/client/checkingAuth", clientController.postCheckingAuth);

router.post("/client/updateCartFromClientToServer", clientController.postUpdateCartFromClientToServer);

router.post("/client/editUserInfo", clientController.postClientEditUserInfo);

router.post("/client/changeAccountPassword", clientController.postClientChangeAccountPassword);

router.post("/client/confirmBeforeResetPassword", clientController.postClientConfirmBeforeResetPassword);

router.post("/client/changeAccountPasswordWithToken", clientController.postChangeAccountPasswordWithToken);

router.post("/client/getOrderHistoryByOrderId", clientController.postGetOrderHistoryByOrderId);

router.post("/client/cancelOrderWithOrderId", clientController.postCancelOrderWithOrderId);











module.exports = router;
