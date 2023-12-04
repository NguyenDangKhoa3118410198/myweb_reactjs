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
            sku: product.sku,
            name: product.name,
            urlPath: product.url_path,
            originPrice: product.original_price,
         };
         products.push(productInfo);
         return productInfo;
      });
      res.json(productData);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

const getReviewsByProductId = async (req, res) => {
   console.log('--------------- Get product by id -------------------');

   try {
      const productId = req.params.id;
      const response = await axios.get(API.reviewAPI(productId));
      // console.log('url: ', API.reviewAPI(productId));

      const reivewData = response.data.data.map((reivew) => {
         const reviewInfo = {
            id: reivew.id,
            title: reivew.title,
            content: reivew.content,
            rating: reivew.rating,
            customerId: reivew.customer_id,
         };
         reviews.push(reviewInfo);
         return reviewInfo;
      });
      // console.log(reviews);
      res.json(reivewData);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
};

module.exports = { getProducts, getReviewsByProductId };
