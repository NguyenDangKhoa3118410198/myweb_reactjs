const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', userController.getUsers);
router.post('/add', userController.addUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/edit', userController.editUser);

module.exports = router;
