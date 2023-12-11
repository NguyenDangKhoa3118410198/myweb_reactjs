const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.getUsers);
router.post('/add', userController.addUser);
router.post('/:id/edit', userController.editUser);
router.patch('/:id/deactivate', userController.deactivateUser);
router.patch('/:id/activate', userController.activateUser);

module.exports = router;
