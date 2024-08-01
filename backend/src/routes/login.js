const express = require('express');
const router = express.Router();

const loginController = require('../controllers/LoginController');

router.post('/reset-password', loginController.resetPassword);
router.post('/reset-password/confirm', loginController.confirmResetPassword);
router.post('/admin', loginController.loginRoleAdmin);
router.post('/', loginController.login);
router.post('/vercel', loginController.login);

module.exports = router;
