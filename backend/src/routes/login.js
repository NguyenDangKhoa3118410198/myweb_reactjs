const express = require('express');
const router = express.Router();

const loginController = require('../controllers/LoginController');

router.post('/admin', loginController.loginRoleAdmin);
router.post('/', loginController.login);

module.exports = router;
