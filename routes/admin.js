const path = require("path");
const express = require("express");
const router = express.Router();

const Product = require("../models/product");
const adminController = require("../controllers/admin");
const { check, body } = require("express-validator");
const { validate } = require("../public/js/validator");

router.get("/products", adminController.getProducts);

router.get("/users", adminController.getUsers);

router.get("/events", adminController.getEvents);

router.get("/orders", adminController.getOrders);

router.get("/manage/products", adminController.getAdminProducts);

router.post(
  "/manage/add-product",
  validate.validateAddOrEditProduct(),
  adminController.postAddProduct
);

router.post(
  "/manage/edit-product",
  validate.validateAddOrEditProduct(),
  adminController.postEditProduct
);

router.post("/manage/delete-product", adminController.postDeleteProduct);

router.get("/manage/events", adminController.getAdminEvents);

router.post("/manage/add-event", adminController.postAddEvent);

router.post("/manage/delete-event", adminController.postDeleteEvent);

router.post("/manage/edit-event", adminController.postEditEvent);

router.get("/manage/users", adminController.getAdminUsers);

router.post("/manage/add-user", adminController.postAddUser);

router.post("/manage/delete-user", adminController.postDeleteUser);

router.post("/manage/edit-user", adminController.postEditUser);

router.get("/manage/orders", adminController.getAdminOrders);

// router.post("/manage/add-event", adminController.postAddEvent);

// router.post("/manage/delete-event", adminController.postDeleteEvent);

// router.post("/manage/edit-event", adminController.postEditEvent);

// router.get('/manage/events', adminController.getAdminProducts);

// router.get('/manage/orders', adminController.getAdminProducts);

// router.get('/manage/users', adminController.getAdminProducts);

module.exports = router;
