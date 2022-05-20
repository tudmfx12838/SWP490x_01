const path = require('path');
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/products', adminController.getProducts);

router.get('/users', adminController.getUsers);

router.get('/events', adminController.getEvents);

router.get('/orders', adminController.getOrders);

router.get('/manage/products', adminController.getAdminProducts);

router.post('/manage/add-product', adminController.postAddProduct);

router.post('/manage/edit-product', adminController.postEditProduct);

router.post('/manage/delete-product', adminController.postDeleteProduct);

router.get('/manage/events', adminController.getAdminEvents);

router.post('/manage/add-event', adminController.postAddEvent);

router.post('/manage/delete-event', adminController.postDeleteEvent);

router.post('/manage/edit-event', adminController.postEditEvent);

router.get('/manage/users', adminController.getAdminUsers);

router.post('/manage/add-user', adminController.postAddUser);



// router.get('/manage/events', adminController.getAdminProducts);

// router.get('/manage/orders', adminController.getAdminProducts);

// router.get('/manage/users', adminController.getAdminProducts);

module.exports = router;