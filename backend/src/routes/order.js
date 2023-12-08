const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');

router.get('/', orderController.getOrders);
router.post('/add', orderController.addOrder);
router.delete('/:id', orderController.deleteOrder);
router.post('/:id/edit', orderController.editOrder);
router.get('/:id/detail', orderController.getDetailOrderByOrderId);

router.get('/save', orderController.saveOrder);

module.exports = router;
