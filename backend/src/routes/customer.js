const express = require('express');
const router = express.Router();

const customerController = require('../controllers/CustomerController');
const { checkAdminRole } = require('../middleware');

router.get('/', checkAdminRole, customerController.getCustomers);
router.post('/:id/edit', checkAdminRole, customerController.editCustomers);
router.delete('/:id', checkAdminRole, customerController.deleteCustomer);

module.exports = router;
