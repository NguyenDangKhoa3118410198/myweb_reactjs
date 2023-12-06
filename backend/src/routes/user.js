const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.getUsers);
router.post('/add', userController.addUser);
router.post('/:id/edit', userController.editUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
