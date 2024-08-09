const axios = require('axios');
const { API } = require('../ulti/API');
const Product = require('../models/Product');

const reviews = [];

const getProducts = async (req, res) => {
   console.log('--------------- Get products -------------------');
   const page = parseInt(req.query.page) || 1;
   const limit = parseInt(req.query.limit) || 10;
   const skip = (page - 1) * limit;
   const searchTerm = req.query.search ? req.query.search.trim() : '';

   try {
      const searchQuery = searchTerm
         ? {
              $or: [{ name: { $regex: searchTerm, $options: 'i' } }],
           }
         : {};

      const totalProducts = await Product.countDocuments(searchQuery);
      const productsDB = await Product.find(searchQuery)
         .skip(skip)
         .limit(limit);

      const productData = productsDB.map((product) => {
         const productInfo = {
            id: product.id,
            name: product.name,
            brandName: product.brand_id,
            category: product.category_id,
            price: product.price,
         };

         if (req.user && req.user.role === 'admin') {
            productInfo.sku = product.sku;
            productInfo.description = product.short_description;
            productInfo.urlPath = product.url_path;
            productInfo.urlKey = product.url_key;
            productInfo.originPrice = product.original_price;
            productInfo.thumbnailUrl = product.image_url;
         }

         return productInfo;
      });

      const totalPages = Math.ceil(totalProducts / limit);

      res.status(200).json({
         data: productData,
         pagination: { page, totalPages },
      });
   } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ message: 'Error fetching data' });
   }
};

const getReviewsByProductId = async (req, res) => {
   console.log('--------------- Get product by id -------------------');

   try {
      const productId = req.params.id;
      const response = await axios.get(API.reviewAPI(productId));

      const reviewData = response.data.data.map((review) => {
         const reviewInfo = {
            id: review.id,
            title: review.title,
            content: review.content,
            rating: review.rating,
            customerId: review.customer_id,
            image: review.images.length > 0 ? review.images[0].full_path : null,
         };

         reviews.push(reviewInfo);
         return reviewInfo;
      });
      // console.log(reviews);
      res.status(200).json(reviewData);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

module.exports = { getProducts, getReviewsByProductId };
