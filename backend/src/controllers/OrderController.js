const axios = require('axios');
const orders = [];

const getOrders = async (req, res) => {
   console.log('get orders');

   try {
      const response = await axios.get('https://dummyjson.com/carts');
      const data = response.data.carts;
      const updatedData = data
         .map((order) => {
            return order.products.map((product) => {
               return {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  amount: product.quantity,
                  total: product.total,
               };
            });
         })
         .flat();

      orders.push(updatedData);
      res.json(orders);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = { getOrders };
