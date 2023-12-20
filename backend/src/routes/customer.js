const express = require('express');
const router = express.Router();

const customerController = require('../controllers/CustomerController');
const { checkAdminRole, allowUserEditOwnProfile } = require('../middleware');

router.get('/', checkAdminRole, customerController.getCustomers);
router.patch(
   '/:id/edit/user',
   allowUserEditOwnProfile('Customer'),
   customerController.editCustomers
);
router.patch(
   '/:id/edit/admin',
   checkAdminRole,
   customerController.editCustomers
);
router.delete('/:id', checkAdminRole, customerController.deleteCustomer);

module.exports = router;
