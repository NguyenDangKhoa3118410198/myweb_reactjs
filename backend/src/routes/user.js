const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const { checkAdminRole } = require('../middleware');

router.get('/', userController.getUsers);
router.post('/add', checkAdminRole, userController.addUser);
router.post('/:id/edit', checkAdminRole, userController.editUser);
router.patch('/:id/deactivate', checkAdminRole, userController.deactivateUser);
router.patch('/:id/activate', checkAdminRole, userController.activateUser);

module.exports = router;
