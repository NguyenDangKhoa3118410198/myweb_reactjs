const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');

router.get('/getAllOrders', orderController.getOrders);

module.exports = router;
