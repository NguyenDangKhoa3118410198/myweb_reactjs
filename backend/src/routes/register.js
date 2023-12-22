const express = require('express');
const router = express.Router();

const registerController = require('../controllers/RegisterController');

router.post('/', registerController.register);
router.get('/verify', registerController.verifyEmail);

module.exports = router;
