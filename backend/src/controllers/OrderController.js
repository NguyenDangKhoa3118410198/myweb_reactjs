const Order = require('../models/Order');
const ProductOfOrder = require('../models/ProductOfOrder');

const axios = require('axios');
const orders = [];

const countTotalOrders = async (req, res) => {
   console.log('--------------- Count total orders -------------------');

   try {
      const count = await Order.countDocuments({});
      res.status(200).json({
         success: true,
         message: 'Total orders counted successfully!',
         totalOrders: count,
      });
   } catch (error) {
      console.error('Error counting total orders:', error);
      res.status(500).json({
         success: false,
         message: 'Internal server error',
         error: error.message,
      });
   }
};

const getOrders = async (req, res) => {
   console.log('--------------- Get orders -------------------');
   const page = parseInt(req.query.page, 10);
   const limit = parseInt(req.query.limit, 10);
   const skip = (page - 1) * limit;
   const searchTerm = req.query.search ? req.query.search.trim() : '';
   const searchNumber = parseFloat(searchTerm);

   try {
      const searchQuery = !isNaN(searchNumber)
         ? {
              $or: [{ total: searchNumber }, { discountedTotal: searchNumber }],
           }
         : searchTerm
         ? {
              $or: [{ status: { $regex: searchTerm, $options: 'i' } }],
           }
         : {};

      const totalOrders = await Order.countDocuments(searchQuery);
      const ordersDB = await Order.find(searchQuery).skip(skip).limit(limit);

      const listOrders = ordersDB.map((order) => ({
         id: order._id,
         customerId: order.customerId,
         total: order.total,
         discountedTotal: order.discountedTotal,
         totalProducts: order.totalProducts,
         totalQuantity: order.totalQuantity,
         status: order.status,
      }));

      const totalPages = Math.ceil(totalOrders / limit);

      res.status(200).json({
         data: listOrders,
         pagination: { page, totalPages },
      });
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

const saveOrder = async (req, res) => {
   console.log('--------------- Save orders -------------------');
   try {
      const response = await axios.get('https://dummyjson.com/carts');
      const jsonDataArray = response.data.carts;

      // Lặp qua mảng đơn hàng
      for (const jsonData of jsonDataArray) {
         // Tạo đối tượng Order từ thông tin chung của đơn hàng
         const orderData = {
            userId: jsonData.userId,
            total: jsonData.total,
            discountedTotal: jsonData.discountedTotal,
            totalProducts: jsonData.totalProducts,
            totalQuantity: jsonData.totalQuantity,
         };

         const savedOrder = await Order.create(orderData);

         for (const productData of jsonData.products) {
            const productOfOrderData = {
               id: productData.id,
               title: productData.title,
               price: productData.price,
               quantity: productData.quantity,
               total: productData.total,
               discountPercentage: productData.discountPercentage,
               discountedPrice: productData.discountedPrice,
               thumbnail: productData.thumbnail,
               orderId: savedOrder._id,
            };

            await ProductOfOrder.create(productOfOrderData);
         }
      }

      console.log('Dữ liệu đã được lưu vào cơ sở dữ liệu.');
   } catch (error) {
      console.error(error);
   }
};

const getDetailOrderByOrderId = async (req, res) => {
   console.log(
      '--------------- Get detail order by order id -------------------'
   );
   const orderId = req.params.id;

   try {
      if (!orderId) {
         return res.status(400).json({ error: 'Invalid orderId' });
      }

      const detailOrderDB = await ProductOfOrder.find({ orderId });

      if (!detailOrderDB) {
         return res.status(404).json({ error: 'Order not found' });
      }
      const simplifiedOrders = detailOrderDB.map((detailOrder) => ({
         id: detailOrder.id,
         title: detailOrder.title,
         price: detailOrder.price,
         quantity: detailOrder.quantity,
         total: detailOrder.total,
         discountPercentage: detailOrder.discountPercentage,
         discountedPrice: detailOrder.discountedPrice,
         thumbnail: detailOrder.thumbnail,
      }));

      res.json(simplifiedOrders);
   } catch (error) {
      console.error(error);

      res.status(500).json({ error: 'Internal Server Error' });
   }
};

module.exports = {
   countTotalOrders,
   getOrders,
   addOrder,
   deleteOrder,
   editOrder,
   getDetailOrderByOrderId,
   saveOrder,
};
