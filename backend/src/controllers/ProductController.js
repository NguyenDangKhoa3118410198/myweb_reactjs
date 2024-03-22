const axios = require('axios');
const { API } = require('../ulti/API');
const products = [];
const reviews = [];

const getProducts = async (req, res) => {
   console.log('--------------- Get products -------------------');

   try {
      const response = await axios.get(API.productAPI);

      const productData = response.data.data.map((product) => {
         const productInfo = {
            id: product.id,
            name: product.name,
            brandName: product.brand_name,
            price: product.price,
         };

         if (req.user && req.user.role === 'admin') {
            productInfo.sku = product.sku;
            productInfo.urlPath = product.url_path;
            productInfo.urlKey = product.url_key;
            productInfo.originPrice = product.original_price;
            productInfo.thumbnailUrl = product.thumbnail_url;
         }

         products.push(productInfo);
         return productInfo;
      });

      res.status(200).json(productData);
   } catch (error) {
      console.error('Error fetching data:', error);
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
