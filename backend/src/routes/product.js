const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');
const { checkAdminRole } = require('../middleware');

router.get('/', productController.getProducts);
router.get(
   '/:id/review',
   checkAdminRole,
   productController.getReviewsByProductId
);

module.exports = router;
