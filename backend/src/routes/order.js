const express = require('express');
const router = express.Router();

const orderController = require('../controllers/OrderController');
const { checkAdminRole } = require('../middleware');

router.get('/', checkAdminRole, orderController.getOrders);
router.post('/add', checkAdminRole, orderController.addOrder);
router.delete('/:id', checkAdminRole, orderController.deleteOrder);
router.post('/:id/edit', checkAdminRole, orderController.editOrder);
router.get(
   '/:id/detail',
   checkAdminRole,
   orderController.getDetailOrderByOrderId
);

router.get('/save', orderController.saveOrder);

module.exports = router;
