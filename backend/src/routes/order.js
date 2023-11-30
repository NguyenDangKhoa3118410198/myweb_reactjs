const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');

router.get('/', orderController.getOrders);
// router.post('/add', orderController.addUser);
// router.delete('/:id', orderController.deleteUser);
// router.post('/:id/edit', orderController.editUser);

module.exports = router;
