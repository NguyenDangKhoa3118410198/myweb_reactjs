const axios = require('axios');
const orders = [];

const getOrders = async (req, res) => {
   console.log('--------------- Get orders -------------------');

   try {
      const response = await axios.get('https://dummyjson.com/carts');
      const data = response.data.carts;
      const orderData = data
         .map((order) => {
            let idOrder = order.id;
            return order.products.map((product) => {
               return {
                  id: idOrder + '-' + product.id,
                  title: product.title,
                  price: product.price,
                  amount: product.quantity,
                  total: product.total,
               };
            });
         })
         .flat();
      orders.push(...orderData);
      res.json(orderData);
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
   console.log('--------------- Delete order -------------------');

   try {
      const id = req.params.id;
      let orderId;

      if (id.includes('-')) {
         orderId = id;
      } else {
         orderId = parseInt(id, 10);

         if (isNaN(orderId)) {
            return res.status(400).json({
               success: false,
               message: 'Invalid order ID format',
            });
         }
      }
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
   console.log('--------------- Edit order -------------------');

   try {
      const id = req.params.id;
      let orderId;

      if (id.includes('-')) {
         orderId = id;
      } else {
         orderId = parseInt(id, 10);

         if (isNaN(orderId)) {
            return res.status(400).json({
               success: false,
               message: 'Invalid order ID format',
            });
         }
      }
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
