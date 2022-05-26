const path = require('path');
const express = require('express');
const router = express.Router();

const clientController = require('../controllers/client');

router.get('/products',clientController.getProducts);

router.post('/client/order',clientController.postClientOrder);

module.exports = router;