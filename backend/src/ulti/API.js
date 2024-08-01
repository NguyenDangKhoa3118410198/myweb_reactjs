const API = {
   productAPI:
      'https://tiki.vn/api/personalish/v1/blocks/listings?limit=100&categoryId=28454&category=28454',
   reviewAPI: (productId) => {
      return `https://tiki.vn/api/v2/reviews?product_id=${productId}&include=comments&page=1&limit=-1`;
   },
};
module.exports = { API };
