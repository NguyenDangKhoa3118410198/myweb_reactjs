const express = require('express');
const router = express.Router();

const customerController = require('../controllers/CustomerController');

router.get('/', customerController.getCustomers);
router.post('/:id/edit', customerController.editCustomers);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
