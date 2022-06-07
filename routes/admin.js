const path = require("path");
const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const adminController = require("../controllers/admin");
const { check, body } = require("express-validator");
const { validate } = require("../public/js/validator");

const isAuth = require("../middleware/is-auth");

router.get("/", isAuth, adminController.getAdminProducts);

router.get("/admin", isAuth, adminController.getAdminProducts);

router.get("/admin/manage/products", isAuth, adminController.getAdminProducts);

router.post(
  "/admin/manage/add-product", isAuth,
  validate.validateAddOrEditProduct(),
  adminController.postAddProduct
);

router.post(
  "/admin/manage/edit-product", isAuth,
  validate.validateAddOrEditProduct(),
  adminController.postEditProduct
);

router.post("/admin/manage/delete-product", isAuth, adminController.postDeleteProduct);

router.get("/admin/manage/events", isAuth, adminController.getAdminEvents);

router.post("/admin/manage/add-event", isAuth, adminController.postAddEvent);

router.post("/admin/manage/delete-event", isAuth, adminController.postDeleteEvent);

router.post("/admin/manage/edit-event", isAuth, adminController.postEditEvent);

router.get("/admin/manage/users", isAuth, adminController.getAdminUsers);

router.post(
  "/admin/manage/add-user", isAuth,
  validate.validateAddOrEditUser(),
  adminController.postAddUser
);

router.post("/admin/manage/delete-user", isAuth, adminController.postDeleteUser);

router.post("/admin/manage/edit-user", isAuth, adminController.postEditUser);

router.get("/admin/manage/orders", isAuth, adminController.getAdminOrders);

// router.get("/", adminController.getProducts);

// router.get("/products", adminController.getProducts);

// router.get("/users", adminController.getUsers);

// router.get("/events", adminController.getEvents);

// router.get("/orders", adminController.getOrders);

// router.post("/manage/add-event", adminController.postAddEvent);

// router.post("/manage/delete-event", adminController.postDeleteEvent);

// router.post("/manage/edit-event", adminController.postEditEvent);

// router.get('/manage/events', adminController.getAdminProducts);

// router.get('/manage/orders', adminController.getAdminProducts);

// router.get('/manage/users', adminController.getAdminProducts);

module.exports = router;
