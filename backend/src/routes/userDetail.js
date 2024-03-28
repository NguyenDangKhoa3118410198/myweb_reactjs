const express = require('express');
const router = express.Router();

const userDetailController = require('../controllers/UserDetailController');
const { checkAdminRole, allowUserEditOwnProfile } = require('../middleware');

router.get('/', checkAdminRole, userDetailController.getUsersDetail);
router.patch(
   '/:id/edit/user',
   allowUserEditOwnProfile('UserDetail'),
   userDetailController.editUserDetail
);
router.patch(
   '/:id/edit/admin',
   checkAdminRole,
   userDetailController.editUserDetail
);
router.delete('/:id', checkAdminRole, userDetailController.deleteUserDetail);

module.exports = router;
