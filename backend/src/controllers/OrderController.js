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
      orders.push(...updatedData);
      res.json(orders);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const addOrder = async (req, res) => {
   console.log('--------------- Add order -------------------');

   try {
      const newOrder = req.body;
      const lastElement = orders.length > 0 ? orders[orders.length - 1] : null;
      const lastElementId = lastElement ? parseInt(lastElement.id, 10) : 0;

      newOrder.id = lastElementId + 1;
      orders.push(newOrder);
      res.json({
         success: true,
         message: 'Order added successfully',
         newOrder,
      });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
   }
};

const deleteOrder = (req, res) => {
   try {
      const orderId = parseInt(req.params.id, 10);
      console.log('delete orderId : ', orderId);

      const orderIndex = orders.findIndex((order) => order.id === orderId);

      if (orderIndex === -1) {
         return res.status(404).json({
            success: false,
            message: 'Order not found',
         });
      }

      const deletedUser = orders.splice(orderIndex, 1)[0];

      res.json({
         success: true,
         message: 'User deleted successfully',
         deletedUser,
      });
   } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message,
      });
   }
};

const editOrder = (req, res) => {
   try {
      const orderId = parseInt(req.params.id, 10);
      const updatedOrderData = req.body;

      const orderIndex = orders.findIndex((order) => order.id === orderId);

      if (orderIndex === -1) {
         return res.status(404).json({
            success: false,
            message: 'Order not found',
         });
      }

      console.log('Edit: ', orderIndex);

      orders[orderIndex] = { ...orders[orderIndex], ...updatedOrderData };

      console.log('Updated order:', orders[orderIndex]);

      res.json({
         success: true,
         message: 'Order updated successfully',
         orders,
      });
   } catch (error) {
      console.error('Error editing order:', error.message);
      res.status(500).json({
         success: false,
         message: 'Internal Server Error',
      });
   }
};

module.exports = { getOrders, addOrder, deleteOrder, editOrder };
