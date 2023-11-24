const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/getAllUsers', userController.getUsers);

module.exports = router;
