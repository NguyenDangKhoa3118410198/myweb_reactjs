const express = require('express');
const router = express.Router();

const customerController = require('../controllers/CustomerController');

router.get('/', customerController.getCustomers);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
