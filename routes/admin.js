const path = require('path');
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/products', adminController.getProducts);

router.get('/users', adminController.getUsers);

router.get('/events', adminController.getEvents);

router.get('/orders', adminController.getOrders);

router.get('/admin/products', adminController.getAdminProducts);

module.exports = router;